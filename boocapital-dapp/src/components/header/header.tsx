import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import classes from "./header.module.css";
import logo from "../../assets/images/LOGO.png";
import { useWalletConnect } from "../../hooks/useWalletConnect";

export default function Header() {
  const [activeClass, setActiveClass] = useState(false);
  const { account, onConnect, onDisconnect } = useWalletConnect();
  const navClass = activeClass ? "navbar-active" : "navbar";
  const toggleActive = () => {
    activeClass ? setActiveClass(false) : setActiveClass(true);
  };
  const filterAddress = ( acc : string) => {
    return acc.slice(0, 5) + '...' + acc.slice(38, 42);
  }
  return (
    <nav>
      <div className={classes["logo-section"]}>
        <img src={logo} alt="logo" />
        <h1>Boo Time !</h1>
      </div>
      <div>
        <ul className={classes[navClass]}>
          <li>
            <div className={classes["cnt-btn-secondary"]}>
              <a>Website</a>
            </div>
          </li>
          <li>
            <div className={classes["cnt-btn-secondary"]}>
              <a>Mint NFT</a>
            </div>
          </li>
          <li>
            <div className={classes["cnt-btn"]} onClick={async (e) => {
                        e.preventDefault()
                        await onConnect()
                      }}>
              <a> {account ? filterAddress(account) : 'Connect Wallet'}</a>
            </div>
          </li>
          <li>
            <a className={classes.logout} onClick={(e) => {
                        e.preventDefault();
                        onDisconnect()}}>
              <FiLogOut />
            </a>
          </li>
        </ul>
      </div>
      <div className={classes["mobile"]} onClick={toggleActive}>
        {activeClass ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}
