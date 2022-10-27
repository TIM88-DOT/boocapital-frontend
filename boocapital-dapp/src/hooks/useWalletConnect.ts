import Web3 from 'web3';


import { useAppDispatch, useAppSelector } from './useReduxHook';
import { setConnection, setAccountChanged, setChainChanged } from '../redux/wallet/wallet.slice';

export const useWalletConnect = () => {
    const dispatch = useAppDispatch()
    const account = useAppSelector((state) => state.wallet.account)
    const web3: any = useAppSelector((state) => state.wallet.web3)

    const handleConnection = async () => {
        try {
            const res = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            const _web3 = new Web3(window.ethereum);
            const _provider = _web3.currentProvider;
            const _account = res[0];
            const _chainId = await _web3.eth.getChainId();
            console.log(_chainId);
            
            dispatch(setConnection({ _web3, _provider, _account, _chainId }))
            handleProviderChanged(_provider)
        } catch (e) {
            console.log("error:", e)
            alert("Please connect metamask")
        }
    }

    const handleProviderChanged = (_provider: any) => {
        _provider.on('accountsChanged', function (accounts: string[]) {
            window.location.reload();
            dispatch(setAccountChanged(accounts[0]));
        })

        _provider.on('chainChanged', function (networkId: number) {
            window.location.reload();
            dispatch(setChainChanged(networkId))
        })
    }

    const disconnect = async () => {
        const accounts = await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => window.ethereum.request({
            method: 'eth_requestAccounts'
        }))

        const account = accounts[0]

        dispatch(setConnection({ _web3: null, _provider: null, account, _chainId: null }))
    }

    return { web3: web3, account: account, onConnect: handleConnection, onDisconnect: disconnect }

}