import Contender from "../../entities/Contender.entity";
import { useAppSelector } from "../../hooks/useReduxHook";
import classes from "./voting.module.css";
import useGetContenderData from "../../hooks/useGetContenderData";
import globeLogo from "../../assets/images/globe.png";
import user from "../../assets/images/person.png";
import download from "../../assets/images/download.png";
export default function Voting(props: any) {
  const contenders: Contender[] | null = useAppSelector<Contender[] | null>(
    (state) => state.contest.contenders
  );
  const getData = (contender: Contender) => {
    const cont = useGetContenderData(contender?.id);
    if (cont) {
      return cont[0];
    }
  };
  contenders?.map((contender: any) => console.log(contender));
  let n = 0;
  const count = () => {
    n++;
    return n;
  };
  return (
    <>
      {contenders
        ?.slice()
        .sort((a, b) => (a?.votes < b?.votes ? 1 : -1))
        ?.map((contender: Contender) => (
          <div className={classes.container}>
            <div className={classes.left}>
              <div className={classes.section}>
                <p>Top voted</p>
                <h1>#{count()}</h1>
              </div>
              <div className={classes.section}>
                <img src={getData(contender)?.logoUrl as any} />
              </div>
              <div className={classes.section}>
                <h4>{getData(contender)?.name}</h4>
                <p>{getData(contender)?.tokenAddress}</p>
              </div>
            </div>

            <div className={classes.right}>
              <div className={classes.item}>
                <h4>Total Votes</h4>
                <p>{contender.votes}</p>
              </div>
              <div className={classes.item}>
              <div className={classes.logos}>
                <img src={globeLogo} />
                <img src={user} />
                <img src={download} />
                </div>
                <div className={classes["view-btn"]}>
                <a>Vote</a>
              </div>
              </div>

            </div>
          </div>
        ))}
    </>
  );
}
