import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance:number, decimals = 18) => {
    console.log(balance)
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance
}

export const getFullDisplayBalance = (balance:number, decimals = 18) => {
    return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals)).toFixed(2)
}