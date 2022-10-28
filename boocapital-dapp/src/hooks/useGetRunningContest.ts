import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";
import Contest from "../entities/Contest.entity";



function getCurrentContest(contract: Contract | null) {
  return async (_: Contest) => {
    const contests = await <Contest>contract?.methods.getCurrentContest().call();

    return contests;
  };
}

export default function useGetRunningContest(
  suspense = false
) {
  const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

  const shouldFetch = !!voteContract;

  const result = useSWR<Contest>(shouldFetch ? ["getCurrentContest"] : null, getCurrentContest(voteContract), {
    suspense,
  });

  useKeepDataLiveWithBlocks(result.mutate);

  return result;
}
