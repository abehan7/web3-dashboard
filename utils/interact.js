import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export const web3 = createAlchemyWeb3(
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || ""
);

const nftContract = new web3.eth.Contract(CONTRACT.ABI, CONTRACT.ADDRESS);

export const setApprovalForAll = async () => {
  if (!window.ethereum.selectedAddress) return;
  try {
    const isApproved = await nftContract.methods
      .setApprovalForAll(STAKE.STAKE_CONTRACT_ADDRESS, true)
      .send({ from: window.ethereum.selectedAddress });
    console.log(isApproved);
    return isApproved;
  } catch (error) {
    console.error(error);
  }
};
