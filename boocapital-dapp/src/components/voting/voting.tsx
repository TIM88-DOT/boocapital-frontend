import Contender from "../../entities/Contender.entity";
import { useAppSelector } from "../../hooks/useReduxHook";
import classes from "./voting.module.css";
export default function Voting(props: any) {
  const contenders: Contender[] | null = useAppSelector<Contender[] | null>(
    (state) => state.contest.contenders
  );
  console.log(contenders);
  
  return (
    <>
      {
        contenders?.map((element: Contender) => (
          <div className={classes.left}>
            <p>{element.name}</p>
            </div>
        ))}
    </>
  );
}
