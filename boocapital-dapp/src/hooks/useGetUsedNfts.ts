import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";


function getContestUsedNFTs(contract: Contract | null, contestId: number | null) {

    return async (_: number[]) => {
        const usedNFTs = <Array<number>>contract?.methods.getContestUsedNFTs(contestId).call();
        return usedNFTs;
    };
}

export default function useGetUsedNfts(
    contestId: number | null,
    suspense = false
) {
    const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

    const shouldFetch = !!voteContract;

    const result = useSWR(shouldFetch ? ["getContestUsedNFTs"] : null, getContestUsedNFTs(voteContract, contestId), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
