import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import NFT_ABI from "../abi/nft-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";
import { useWalletConnect } from "./useWalletConnect";


function walletOfOwner(contract: Contract | null) {
    const { account } = useWalletConnect();

    return async (_: number) => {
        const balance = <Array<number>>contract?.methods.walletOfOwner(account).call();
        return balance;
    };
}

export default function useGetNftBalance(
    suspense = false
) {
    const nftContract = useGetContract(constants.NFT_CONTRACT_ADDRESS, NFT_ABI);

    const shouldFetch = !!nftContract;

    const result = useSWR<Array<number>>(shouldFetch ? ["walletOfOwner"] : null, walletOfOwner(nftContract), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
