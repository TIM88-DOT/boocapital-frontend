import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";



function getContests(contract: Contract | null) {
  return async (_: any) => {
    const contests = await contract?.methods.getAllContests().call();

    return contests;
  };
}

export default function useGetContests(
  suspense = false
) {
  const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

  const shouldFetch = !!voteContract;

  const result: any = useSWR(shouldFetch ? ["getAllContests"] : null, getContests(voteContract), {
    suspense,
  });

  useKeepDataLiveWithBlocks(result.mutate);

  return result;
}
