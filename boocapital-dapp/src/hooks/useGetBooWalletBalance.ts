import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import TOKEN_ABI from "../abi/token-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";


function balanceOfWallet(contract: Contract | null) {
    

    return async (_: any) => {
        const balance = contract?.methods.balanceOf(constants.BOO_WALLET_ADDRESS).call();
        
        return balance;
    };
}

export default function useGetBooWalletBalance(
    suspense = false
) {
    const tokenContract = useGetContract(constants.BUSD_CONTRACT_ADDRESS, TOKEN_ABI);

    const shouldFetch = !!tokenContract;

    const result: any = useSWR(shouldFetch ? ["balanceOfWallet"] : null, balanceOfWallet(tokenContract), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
