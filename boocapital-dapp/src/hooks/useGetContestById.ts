import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";
import Contest from "../entities/Contest.entity";



function getContest(contract: Contract | null, contestId: number) {
    return async (_: Contest) => {
        const contest = await <Contest>contract?.methods.getContest(contestId).call();

        return contest;
    };
}

export default function useGetContestById(
    contestId: number,
    suspense = false
) {
    const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

    const shouldFetch = !!voteContract;

    const result = useSWR<Contest>(shouldFetch ? ["getContest"] : null, getContest(voteContract, contestId), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
