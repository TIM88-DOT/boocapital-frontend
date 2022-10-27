import Contender from "../../entities/Contender.entity";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";

import classes from "./voting.module.css";

import { useState } from "react";

import useGetContenderData from "../../hooks/useGetContenderData";
import { useAppSelector } from "../../hooks/useReduxHook";
import useGetContract from "../../hooks/useGetContract";
import { useWalletConnect } from "../../hooks/useWalletConnect";

import VOTE_ABI from "../../abi/vote-contract-abi.json";

import * as constants from "../../constants/consts";

import globeLogo from "../../assets/images/globe.png";
import user from "../../assets/images/person.png";
import download from "../../assets/images/download.png";
import useGetNftBalance from "../../hooks/useGetNftBalance";
import ListItemText from "@mui/material/ListItemText";
import { List, ListItem, ListItemButton } from "@mui/material";

export default function Voting() {
  const contenders: Contender[] | null = useAppSelector<Contender[] | null>(
    (state) => state.contest.contenders
  );
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const { account } = useWalletConnect();

  const [selectedContenderIndex, setSelectedContenderIndex] =
    useState<number>();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);

    setChecked(newChecked);
  };

  //simple way to sort the contenders
  let contenderCounts = 0;

  const { data: nftBalance } = useGetNftBalance();
  const count = () => {
    contenderCounts++;
    return contenderCounts;
  };

  const getData = (contender: Contender) => {
    const cont = useGetContenderData(contender?.id);
    if (cont) {
      return cont[0];
    }
  };
  const voteContract = useGetContract(
    constants.VOTING_CONTRACT_ADDRESS,
    VOTE_ABI
  );
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "30px",
    maxWidth: "800px",
    borderRadius: "20px",
    maxHeight: "50%",
    overflow: "scroll",
  };

  const onSelect = (selectCont: any) => {
    const selectedContender = contenders
      ?.slice()
      .findIndex((e) => e.id == selectCont?.id);
    setSelectedContenderIndex(selectedContender);
    setOpen(true);
  };
  const onVote = async () => {
    await voteContract?.methods.vote(selectedContenderIndex, checked).send({
      from: account,
    });

    setOpen(false);
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
                  <div>
                    <img src={globeLogo} />
                  </div>
                  <img src={user} />
                  <img src={download} />
                </div>
                <div
                  className={classes["view-btn"]}
                  onClick={() => onSelect(contender)}
                >
                  <a>Vote</a>
                </div>
              </div>
            </div>

            <Modal
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <h4 style={{ width: "100%" }}>Select your NFT(s) :</h4>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {nftBalance?.map((value) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem key={value} disablePadding>
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                          >
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                            <ListItemText
                              id={labelId}
                              primary={`ID ${value}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  <div
                    style={{ margin: "10px 0", textAlign: "end" }}
                    className={classes["view-btn"]}
                    onClick={onVote}
                  >
                    <a>Confirm</a>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))}
    </>
  );
}
