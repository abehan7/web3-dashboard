import { useCallback, useEffect, useState } from "react";
import { useMoralis, useWeb3Transfer, useMoralisWeb3Api } from "react-moralis";
import AutoHeightImage from "../components/common/AutoHeightImage";
import { ITokenList, ITransferOption } from "../objects";

const baseURI = "https://ipfs.io/ipfs/";

const getIPFS = (uri) => {
  if (!uri) return null;
  const _ipfs = baseURI + uri?.split("/ipfs/")[1];
  return _ipfs;
};

const Card = ({
  name,
  symbol,
  token_id,
  metadata,
  onClick,
  contractAddress,
}) => {
  // https://ipfs.io/ipfs/
  const [receiver, setReceiver] = useState(null);
  const onChange = useCallback((e) => {
    setReceiver(e.target.value);
    console.log(e.target.value);
  }, []);

  const imageSrc = metadata?.image;
  const ipfsSrc = getIPFS(imageSrc);
  // console.log("ipfsSrc", ipfsSrc);
  const isMp4 = ipfsSrc?.includes(".mp4" || ".gif");
  const isImg = ipfsSrc?.includes(".png" || ".jpg" || ".jpeg");
  return (
    <div className="  rounded-lg bg-white  cursor-pointer">
      {!isMp4 && (
        <div className="rounded-xl h-[10rem]">
          <AutoHeightImage imgSrc={ipfsSrc} />
        </div>
      )}
      {isMp4 && (
        <div className="flex items-center justify-center h-[10rem] max-h-[10rem] overflow-hidden rounded-xl">
          <video
            src={ipfsSrc}
            className="rounded-xl cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
      <div>
        {name} #{token_id}
      </div>
      <div className="flex items-center justify-center max-w-[10rem]">
        <input
          className="max-w-[10rem] border"
          onChange={onChange}
          value={receiver}
        />
      </div>
      {/* tokenId, contractAddress, receiver */}
      <div
        onClick={() =>
          onClick({ tokenId: token_id, contractAddress, receiver })
        }
      >
        send
      </div>
    </div>
  );
};

export default function Home() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [isClickedTransferNFT, setIsClickedTransferNFT] = useState(false);
  const [tokenList, setTokenList] = useState(ITokenList);
  const [transferOption, setTransferOption] = useState(ITransferOption);
  const { fetch, error, isFetching } = useWeb3Transfer(transferOption);
  // Moralis.start()

  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = async () => {
    const wallet = user?.get("ethAddress");
    // get NFTs for current user on Mainnet
    if (!Web3Api || !wallet) return;
    try {
      const userEthNFTs = await Web3Api?.account.getNFTs({
        address: wallet,
        chain: "rinkeby",
      });
      const _userEthNFTs = userEthNFTs.result.map((nft) => {
        return {
          ...nft,
          metadata: JSON.parse(nft.metadata),
        };
      });

      // https://ipfs.io/ipfs/QmVB2Qp2kEwrKAWUfJPGpWxJDBTS866E715m8yWqSR7Hu3/hidden.png
      setTokenList(_userEthNFTs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSendNFT = async ({ tokenId, contractAddress, receiver }) => {
    if (!Web3Api) return;
    setIsClickedTransferNFT(true);
    setTransferOption({ tokenId, contractAddress, receiver });
  };

  const login = async () => {
    // if (!isAuthenticated) {
    await authenticate()
      .then(function (user) {
        console.log(user?.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  };

  useEffect(() => {
    fetchNFTs();
  }, [user]);

  useEffect(() => {
    if (!isClickedTransferNFT) return;
    const init = async () => {
      try {
        await fetch();
        setIsClickedTransferNFT(false);
        // error, isFetching;
        console.log(error, isFetching);
      } catch (error) {
        console.log(error);
        setIsClickedTransferNFT(false);
      }
    };
    init();
  }, [transferOption]);

  // console.log(user);
  // const arr = Array.from({ length: 10 }, (_, i) => i);
  const cards = tokenList.map((token) => (
    <Card
      key={token.token_hash}
      name={token.name}
      token_uri={token.token_uri}
      token_id={token.token_id}
      symbol={token.symbol}
      metadata={token.metadata}
      onClick={handleClickSendNFT}
      contractAddress={token.token_address}
    />
  ));

  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-start flex-col gap-10">
      <div className="h-[8rem] flex items-center justify-center flex-col cursor-pointer">
        <div>{user?.get("ethAddress")}</div>
        <div onClick={login}>log in</div>
        {/* <button>approve for all</button> */}
      </div>
      <div
        className="grid grid-cols-5 w-[80%] gap-4 items-center justify-center"
        style={{
          gridTemplateColumns: "repeat(5, 10rem)",
        }}
      >
        {cards}
      </div>
    </div>
  );
}
