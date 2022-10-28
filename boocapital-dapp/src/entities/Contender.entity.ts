export default class Contender {
    id: string;
    tokenAddress: string;
    name: string;
    logoUrl: string;
    website: string;
    votes: number;

    constructor(id: string, tokenAddress: string, votes: number, name: string, logoUrl: string, website: string) {
        this.id = id
        this.tokenAddress = tokenAddress;
        this.name = name;
        this.logoUrl = logoUrl;
        this.website = website;
        this.votes = votes;
    }

}
