import classes from "./card.module.css";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useReduxHook";
import { setContest } from "../../redux/contest/contest.slice";

export default function Card(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [_id, _contenders, _isRunning] = [
    props.contest.id,
    props.contest.contenders,
    props.contest.isRunning,
  ];
  const onOpenDetails = () =>{
    dispatch(setContest({ _id, _contenders, _isRunning }));
    navigate("contest");
  }

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
          <div className={classes["view-btn"]} onClick={onOpenDetails}>
            <a>View</a>
          </div>
        </div>
      </div>
    </>
  );
}
