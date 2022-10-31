import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";


function getContestVoters(contract: Contract | null, contestId: number | null) {

    return async (_: string[]) => {
        const votersList = <Array<string>>contract?.methods.getContestVoters(contestId).call();
        return votersList;
    };
}

export default function useGetListOfVoters(
    contestId: number | null,
    suspense = false
) {
    const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

    const shouldFetch = !!voteContract;

    const result = useSWR(shouldFetch ? ["getContestVoters"] : null, getContestVoters(voteContract, contestId), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
