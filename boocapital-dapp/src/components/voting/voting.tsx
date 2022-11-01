import Contender from "../../entities/Contender.entity";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";

import classes from "./voting.module.css";

import { useEffect, useState } from "react";

import useGetContract from "../../hooks/useGetContract";
import useGetNftBalance from "../../hooks/useGetNftBalance";
import useGetUsedNfts from "../../hooks/useGetUsedNfts";
import useGetRunningContest from "../../hooks/useGetRunningContest";
import { useWalletConnect } from "../../hooks/useWalletConnect";

import VOTE_ABI from "../../abi/vote-contract-abi.json";

import * as constants from "../../constants/consts";

import globeLogo from "../../assets/images/globe.png";
import user from "../../assets/images/person.png";
import download from "../../assets/images/download.png";
import ListItemText from "@mui/material/ListItemText";
import { List, ListItem, ListItemButton } from "@mui/material";

import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import useGetListOfVoters from "../../hooks/useGetListOfVoters";
import { generateCSV } from "../../utils/downloadCsv";

const firebaseConfig = {
  apiKey: "AIzaSyAxfxJ_o8Qd8-yxgahpm0V4-vxcxVfxJIw",
  authDomain: "boo-it.firebaseapp.com",
  projectId: "boo-it",
  storageBucket: "boo-it.appspot.com",
  messagingSenderId: "436077767040",
  appId: "1:436077767040:web:b454fc826316c97d3db965",
  measurementId: "G-3R9D6W7M1P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contendersRef = collection(db, "contenders");

export default function Voting() {
  const [open, setOpen] = useState(false);
  const [openVoters, setOpenVoters] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [availableNfts, setAvailableNfts] = useState<number[] | undefined>([]);
  const [contestId, setContestId] = useState<number>();
  const [contenders, setContenders] = useState<Contender[] | undefined>([]);
  const [voters, setVoters] = useState<[any, any][]>([]);

  const { account } = useWalletConnect();
  const { data: nftBalance } = useGetNftBalance();
  const { data: usedNfts } = useGetUsedNfts(contestId as number);
  const { data: currentContest } = useGetRunningContest();
  const { data: votersList } = useGetListOfVoters(contestId as number);

  const [selectedContenderIndex, setSelectedContenderIndex] =
    useState<number>();

  const q = query(contendersRef, orderBy("id"), limitToLast(100));
  const contenderDetails = useCollectionData(q)[0] as Contender[];

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  //simple way to sort the contenders
  let contenderCounts = 0;

  const count = () => {
    contenderCounts++;
    return contenderCounts;
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

  const onOpenVotersList = () => {
    setOpenVoters(true);
  };

  const getData = (contenderId: string) => {
    const arr = contenderDetails?.find((r) => contenderId == r.id) as Contender;
    //console.log(arr);
    return arr;
  };

  const onDownload = () => {
    const csvHeader = [{ label: "User Address", key: "USER_ADDRESS" },
    { label: "Votes", key: "VOTES" },];
    console.log(voters);

    generateCSV(csvHeader, voters, "Voterslist");
  };

  useEffect(() => {
    const availabNFTs = nftBalance?.filter((n) => !usedNfts?.includes(n));
    setAvailableNfts(availabNFTs);
  }, [usedNfts, nftBalance]);

  useEffect(() => {
    setContestId(currentContest?.id);
    const currentContenders = currentContest?.contenders;

    setContenders(currentContenders);
  }, [currentContest]);

  useEffect(() => {
    const map = votersList?.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );
    if (map) {
      setVoters([...map.entries()]);
      console.info("aa", [...map.entries()]);
    }
  }, [votersList]);

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
                <img src={getData(contender.id)?.logoUrl as any} />
              </div>
              <div className={classes.section}>
                <h4>{getData(contender.id)?.name}</h4>
                <p>{getData(contender.id)?.tokenAddress}</p>
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
                  <a onClick={onOpenVotersList}>
                    <img src={user} />
                  </a>
                  <a onClick={onDownload}>
                    <img src={download} />
                  </a>
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
                    {availableNfts?.map((value) => {
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

            <Modal
              open={openVoters}
              onClose={() => setOpenVoters(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openVoters}>
                <Box sx={style}>
                  <h4 style={{ width: "100%", marginBlock: "0" }}>
                    All voters :
                  </h4>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {voters?.map((value) => {
                      const labelId = `checkbox-list-label-${value[0]}`;

                      return (
                        <ListItem disablePadding>
                          <ListItemButton role={undefined} dense>
                            <ListItemText
                              id={labelId}
                              primary={value[0] +","+ value[1]}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Fade>
            </Modal>
          </div>
        ))}
    </>
  );
}
