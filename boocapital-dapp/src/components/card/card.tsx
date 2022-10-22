import classes from "./card.module.css";
import { BsCircleFill } from "react-icons/bs";


export default function Card(props: any) {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.section}>
          <h4>Round</h4>
          <h1>{props.round}</h1>
          <div className={classes.borderRight}></div>
        </div>
        <div className={classes.section}>
          <h4>Status</h4>
          <BsCircleFill />
          <p>In Progress</p>
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
