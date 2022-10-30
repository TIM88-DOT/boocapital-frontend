import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { useState } from "react";
import { setConnection } from "../redux/wallet/wallet.slice";
import { useAppDispatch, useAppSelector } from "./useReduxHook";


export const useWalletConnect = () => {
    const [connected, setConnected] = useState(false);
    
    const account = useAppSelector((state) => state.wallet.account);
    const web3: any = useAppSelector((state) => state.wallet.web3);
    const chainId = useAppSelector((state) => state.wallet.chainId);
    const provider = useAppSelector((state) => state.wallet.provider);

    const dispatch = useAppDispatch();
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                chainId: 97,
                rpc: {
                    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                },
            },
        },

        injected: {
            display: {
                logo: "https://github.com/MetaMask/brand-resources/raw/master/SVG/metamask-fox.svg",
                name: "MetaMask",
                description: "Connect with MetaMask in your browser",
            },
            package: null,
        },
    };

    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
    });
    const handleConnection = async () => {
       try {
        if (connected) {
            window.location.reload();
            setConnected(false);
        } else {
            const connection = await web3Modal.connect();
            const _provider = new ethers.providers.Web3Provider(connection);
            await _provider.send("eth_requestAccounts", []);
            handleProviderChanged(_provider);
            const _web3 = new Web3(connection);
            const _account = await _provider.getSigner().getAddress();
            const _chainId = await _provider.getSigner().getChainId();
            dispatch(setConnection({ _web3, _provider, _account, _chainId }))
            setConnected(true);
        }
       } catch (error) {
        console.log(error);
       } 
      
    }

    const disconnect = async () => {
        if (connected) {
            window.location.reload();
            setConnected(false);
        }
    }

    const handleProviderChanged = (_provider: any) => {
        _provider.on('accountsChanged', function (accounts: string[]) {
            dispatch(setConnection({ account: accounts[0] }))
        })

        _provider.on('chainChanged', function (networkId: number) {
            dispatch(setConnection({ chainId: networkId }));
        })

        _provider.on("disconnect", (error: { code: number; message: string }) => {
            console.log(error);
        });
    }
    return { web3: web3, provider, account: account, chainId, onConnect: handleConnection, onDisconnect: disconnect }

}

