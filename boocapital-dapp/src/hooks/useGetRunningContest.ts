import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/votecontract-abi.json";
import useGetVoteContract from "../hooks/useGetVoteContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";



function getCurrentContest(contract: Contract | null) {
  return async (_: any) => {
    const contests = await contract?.methods.getCurrentContest().call();

    return contests;
  };
}

export default function useGetRunningContest(
  suspense = false
) {
  const voteContract = useGetVoteContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

  const shouldFetch = !!voteContract;

  const result: any = useSWR(shouldFetch ? ["getCurrentContest"] : null, getCurrentContest(voteContract), {
    suspense,
  });

  useKeepDataLiveWithBlocks(result.mutate);

  return result;
}
