"use client";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./Shared/firebaseConfig";
import { useEffect, useState } from "react";
import PinList from "./components/Pins/PinList";

export default function Home() {
  const db = getFirestore(app)
  const [listOfPins, setListOfPins] = useState<any[]>([])

  useEffect(() => {
    getAllPins()
  }, [])

  const getAllPins = async () => {
    const querySnapshot = await getDocs(collection(db, "pinteres-post"));
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setListOfPins((listOfPins: any[]) => [...listOfPins, doc.data()])
    });
  }
  
  return (
    <>
     <PinList listOfPins={listOfPins} />
    </>
  );
}
