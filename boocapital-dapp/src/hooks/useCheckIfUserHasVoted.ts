import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";
import { useWalletConnect } from "./useWalletConnect";


function checkIsContestVoter(contract: Contract | null, contestId: number | null) {
    const { account } = useWalletConnect();

    return async (_: boolean) => {
        const hasVoted = <boolean>contract?.methods.checkIsContestVoter(contestId, account).call();
        return hasVoted;
    };
}

export default function useCheckIfUserHasVoted(
    contestId: number | null,
    suspense = false
) {
    const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

    const shouldFetch = !!voteContract;

    const result = useSWR(shouldFetch ? ["checkIsContestVoter"] : null, checkIsContestVoter(voteContract, contestId), {
        suspense,
    });

    useKeepDataLiveWithBlocks(result.mutate);

    return result;
}
