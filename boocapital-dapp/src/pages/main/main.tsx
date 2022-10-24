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
import useGetContenderData from "../../hooks/useGetContenderData";

export default function Main() {
  const { data: allContests } = useGetContests();
  const { data: currentRound } = useGetRound();
  const { data: currentContest } = useGetRunningContest();

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
    console.log("previous",prevContests);
    
    return prevContests;
  };

  const getWinner = (contest : Contest) => {
   const winner : number = Math.max(...contest.contenders.map(cont => cont.votes));
   const winnerObject : Contender | undefined = contest.contenders.find(res => res.votes==winner);
    
    console.log("winner",winnerObject);
    
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
            <CardDisabled winner={getWinner(contest)} round={contest.id}/>
          ))}
        </div>
      </div>
    </>
  );
}
