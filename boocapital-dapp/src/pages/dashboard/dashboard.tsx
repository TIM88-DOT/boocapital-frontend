import Info from "../../components/info/info";
import Voting from "../../components/voting/voting";
import classes from "./dashboard.module.css";
import logo from "../../assets/images/trophy.png"

export default function Dashboard() {
  return (
    <>
      <Info />
      <div className={classes.main}>
      <div className={classes["prize-container"]}>
          <h4>CLAIM VOTED WINNERS</h4>
          <img src={logo} />
          <div className={classes["claim-btn"]}>
          CLAIM
          </div>
        </div>
        <div className={classes.container}>
          <Voting />
        </div>
      </div>
    </>
  );
}
