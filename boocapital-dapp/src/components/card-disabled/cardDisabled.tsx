import classes from "./cardDisabled.module.css";
import { useEffect } from "react";


export default function CardDisabled(props: any) {
  useEffect(() => {
    console.log("url",props.winner.logoUrl);
  }, [props]);
  return (
    <>
      <div className={classes.main}>
        <div className={classes.section}>
          <h4>Round</h4>
          <h1>{props.round}</h1>
        </div>
        <div className={classes.section}>
            <img src={props.winner.logoUrl} />
            <div className={classes.winner}>
            <h4>Winner</h4>
            <h1>{props.winner.name}</h1>
            </div>
        </div>
        <div className={classes.section}>
          <div className={classes["view-btn"]}>
            <a>View</a>
          </div>
        </div>
      </div>
    </>
  );
}
