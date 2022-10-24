import classes from "./info.module.css";
import { Range } from "react-range";
import logo from "../../assets/images/svg.svg";

export default function Info(props: any) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.left}>
          <h4>Boo wallet</h4>
          <Range
            step={0.1}
            min={0}
            max={100}
            values={[1]}
            onChange={(values) => null}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "80%",
                  backgroundColor: "#FFE70D",
                  margin: "auto",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "42px",
                  width: "42px",
                  backgroundColor: "transparent",
                  background: `url(${logo})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          />
        </div>

        <div className={classes.right}>
          <div className={classes.item}>
            <h4>Boo Balance</h4>
            <h1>0</h1>
          </div>
          <div className={classes.item}>
            <h4>NFT Balance</h4>
            <h1>0</h1>
          </div>
          <div className={classes.item}>
            <h4>Your Votes</h4>
            <h1>0</h1>
          </div>
        </div>
      </div>
    </>
  );
}
