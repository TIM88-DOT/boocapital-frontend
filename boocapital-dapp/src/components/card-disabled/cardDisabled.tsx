import classes from "./cardDisabled.module.css";
import useGetContenderData from "../../hooks/useGetContenderData";

export default function CardDisabled(props: any) {
  const contender = useGetContenderData(String(props.winner.id));
  const  [name,  logoUrl] = [
    contender?.map((item) => item.name.toString()),
    contender?.map((item) => item.logoUrl.toString()),
  ];

  return (
    <>
      <div className={classes.main}>
        <div className={classes.section}>
          <h4>Round</h4>
          <h1>{props.round}</h1>
        </div>
        <div className={classes.section}>
          <img src={logoUrl as any} />
          <div className={classes.winner}>
            <h4>Winner</h4>
            <h1>{name}</h1>
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
