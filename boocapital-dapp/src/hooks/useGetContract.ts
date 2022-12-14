import { Contract } from "ethers";
import { useMemo } from "react";
import { useWalletConnect } from "./useWalletConnect";

export default function useContract<T extends Contract = Contract>(
    address: string,
    ABI: any
  ): T | null {
    const { web3, account } = useWalletConnect()

    return useMemo(() => {
        if (!address || !ABI || !web3 ) {
            return null;
        }
        try {
            return new web3.eth.Contract(ABI, address)
        } catch (error) {
            console.error("Failed To Get Contract", error);
            return null;
        }
    }, [address, ABI, account]);
}