import { Contract } from "ethers";
import useSWR from "swr";
import * as constants from "../constants/consts";
import VOTE_ABI from "../abi/vote-contract-abi.json";
import useGetContract from "./useGetContract";
import useKeepDataLiveWithBlocks from "./useKeepDataLiveWithBlocks";



function count(contract: Contract | null) {
  return async (_: any) => {
    const count = await contract?.methods.count().call();

    return count;
  };
}

export default function useGetRound(
  suspense = false
) {
  const voteContract = useGetContract(constants.VOTING_CONTRACT_ADDRESS, VOTE_ABI);

  const shouldFetch = !!voteContract;

  const result: any = useSWR(shouldFetch ? ["count"] : null, count(voteContract), {
    suspense,
  });

  useKeepDataLiveWithBlocks(result.mutate);

  return result;
}
