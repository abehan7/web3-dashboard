import { useEffect, useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import AutoHeightImage from "../components/common/AutoHeightImage";

const baseURI = "https://ipfs.io/ipfs/";
const getIPFS = (uri) => {
  if (!uri) return null;
  const _ipfs = baseURI + uri?.split("/ipfs/")[1];
  console.log("_ipfs", _ipfs);
  return _ipfs;
};
const Card = ({ name, symbol, token_id, metadata }) => {
  // https://ipfs.io/ipfs/
  const imageSrc = metadata?.image;
  const ipfsSrc = getIPFS(imageSrc);
  // console.log("ipfsSrc", ipfsSrc);
  const isMp4 = ipfsSrc?.includes(".mp4" || ".gif");
  const isImg = ipfsSrc?.includes(".png" || ".jpg" || ".jpeg");
  return (
    <div className=" h-[10rem] rounded-lg bg-slate-400  cursor-pointer">
      {!isMp4 && (
        <div className="rounded-xl">
          <AutoHeightImage imgSrc={ipfsSrc} />
        </div>
      )}
      {isMp4 && (
        <video
          src={ipfsSrc}
          className="rounded-xl cover max-h-[10rem] flex items-center justify-center"
        />
      )}
      <div>
        {name} #{token_id}
      </div>
    </div>
  );
};

export default function Home() {
  const [tokenList, setTokenList] = useState([
    {
      amount: "1",
      metadata: "",
      name: "ggg",
      owner_of: "0x45e3ca56946e0ee4bf36e893cc4fbb96a1523212",
      symbol: "ggg",
      token_address: "0xbbd9a15d16598ec32f5f8b23b082088f49773f3e",
      token_hash: "f25ac3055e9e250f4b252dbc22b914ae",
      token_id: "77",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmfAnC1z",
    },
  ]);
  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc721",
    receiver: "0x..",
    contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    tokenId: 1,
  });
  // Moralis.start()
  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = async () => {
    // get NFTs for current user on Mainnet
    if (!Web3Api) return;
    try {
      const userEthNFTs = await Web3Api?.account.getNFTs({
        address: "0x45E3Ca56946e0ee4bf36e893CC4fbb96A1523212",
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

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    console.log(tokenList);
  }, [tokenList]);
  // const arr = Array.from({ length: 10 }, (_, i) => i);
  const cards = tokenList.map((token) => (
    <Card
      key={token.token_hash}
      name={token.name}
      token_uri={token.token_uri}
      token_id={token.token_id}
      symbol={token.symbol}
      metadata={token.metadata}
    />
  ));

  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-start flex-col gap-10">
      <div className="h-[8rem] flex items-center justify-center">
        <button>approve for all</button>
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
