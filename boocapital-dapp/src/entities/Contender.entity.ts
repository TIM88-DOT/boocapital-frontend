export default class Contender {
    tokenAddress: string;
    name: string;
    logoUrl: string;
    votes: number;

    constructor(tokenAddress: string, votes: number, name: string, logoUrl: string) {
        this.tokenAddress = tokenAddress;
        this.name = name;
        this.logoUrl = logoUrl;
        this.votes = votes;
    }

}
