import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import TOKEN_ABI from "../abi/token-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";
import { useWalletConnectModal } from "./useWalletConnectModal";


function getBalance(contract: Contract | null) {
    const { account } = useWalletConnectModal();

    return async (_: any) => {
        const balance = contract?.methods.balanceOf(account).call();

        return balance;
    };
}

export default function useGetTokenBalance(
    suspense = false
) {
    const tokenContract = useGetContract(constants.TOKEN_CONTRACT_ADDRESS, TOKEN_ABI);

    const shouldFetch = !!tokenContract;

    const result: any = useSWR(shouldFetch ? ["balanceOf"] : null, getBalance(tokenContract), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
