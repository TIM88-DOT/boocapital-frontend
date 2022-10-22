import type { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { useAppSelector } from "./useReduxHook";

function getBlockNumber(provider: Web3Provider | undefined) {
  return async () => {
    return provider?.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const provider : any = useAppSelector((state) => state.wallet.provider)
  
  const shouldFetch = !!provider;

  return useSWR(shouldFetch ? ["BlockNumber"] : null, getBlockNumber(provider), {
    refreshInterval: 10 * 1000,
  });

}
