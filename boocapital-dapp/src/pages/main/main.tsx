import { useEffect } from "react";
import classes from "./main.module.css";
import logo from "../../assets/images/LOGO.png";
import bootime from "../../assets/images/bootime.png";
import Card from "../../components/card/card";
import CardDisabled from "../../components/card-disabled/cardDisabled";
import useGetContests from "../../hooks/useGetContests";
import useGetRunningContest from "../../hooks/useGetRunningContest";
import useGetRound from "../../hooks/useGetRound";
import Contest from "../../entities/Contest.entity";
import Contender from "../../entities/Contender.entity";
import { useAppSelector } from "../../hooks/useReduxHook";
import { useWalletConnect } from "../../hooks/useWalletConnect";

export default function Main() {
  const { data: allContests } = useGetContests();
  const { data: currentRound } = useGetRound();
  const { data: currentContest } = useGetRunningContest();
  const {chainId} = useWalletConnect();

  useEffect(() => {
    getPreviousContests();
  }, [allContests]);

  const getPreviousContests = () => {
    const prevContests: Contest[] = [];
    allContests?.map((contest: Contest) =>
      contest.isRunning === false && contest.contenders.length > 0
        ? prevContests.push(contest)
        : null
    );

    return prevContests.sort().reverse();
  };

  const getWinner = (contest: Contest) => {
    const winner: number = Math.max(
      ...contest.contenders.map((cont) => cont.votes)
    );
    const winnerObject: Contender | undefined = contest.contenders.find(
      (res) => res.votes == winner
    );

    return winnerObject;
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.left}>
          <img src={logo} />
          <img src={bootime} />
          <p>
            The Boo Time is a DeFi wallet-integrated tool that entitles Spooky
            Fuses to vote on where the Boo Time Wallet is spent.
          </p>
        </div>
        <div className={classes.right}>
          {chainId != 97 ? (
            <div className={classes.header}>
              <h4>Please connect to BSC Testnet (97)</h4>
            </div>
          ) : (
            <div>
              <div className={classes.header}>
                <h4>
                  Active <span>Boo-It!</span>
                </h4>
              </div>
              {currentContest?.isRunning && (
                <Card contest={currentContest} round={currentRound} />
              )}
              <div className={classes.header}>
                <h4 style={{ marginTop: "50px" }}>
                  Previous <span>Boo-It!</span>
                </h4>
              </div>
              {getPreviousContests()?.map((contest: Contest) => (
                <CardDisabled
                  winner={getWinner(contest)}
                  round={contest.id}
                  key={contest.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
