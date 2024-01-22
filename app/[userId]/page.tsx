"use client"
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from '../Shared/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore';
import UserInfo from '../components/UserInfo';
import PinList from '../components/Pins/PinList';

function Profile({ params }: any) {
    const db = getFirestore(app)

    const [userInfo, setUserInfo] = useState<any>(null)
    const [listOfPins, setListOfPins] = useState<any[]>([])

    useEffect(() => {
        if (params) {
            getUserInfo(params.userId.replace('%40', '@'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userInfo) {
            getUserPins();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const getUserPins = async () => {
        const q = query(collection(db, "pinteres-post"), where("email", "==", userInfo.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            setListOfPins((listOfPins: any[]) => [...listOfPins, doc.data()])
        });
    }

    const getUserInfo = async (email: any) => {
        const docRef = doc(db, "user", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setUserInfo(docSnap.data())
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    }

  return (
    <div>
        {
            userInfo ?
            <div>
                <UserInfo userInfo={userInfo} />
                <PinList listOfPins={listOfPins} />
            </div> 
            :
            null
        }
    </div>
  )
}

export default Profile