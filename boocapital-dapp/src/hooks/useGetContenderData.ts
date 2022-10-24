import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxfxJ_o8Qd8-yxgahpm0V4-vxcxVfxJIw",
  authDomain: "boo-it.firebaseapp.com",
  projectId: "boo-it",
  storageBucket: "boo-it.appspot.com",
  messagingSenderId: "436077767040",
  appId: "1:436077767040:web:b454fc826316c97d3db965",
  measurementId: "G-3R9D6W7M1P"
};

const app = initializeApp(firebaseConfig);

export default function useGetContenderData(id : string) {
    const db = getFirestore(app);
    const contendersRef = collection(db, "contenders");
    const q = query(contendersRef, where("id", "==", id));
    return useCollectionData(q)[0];
  }