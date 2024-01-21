"use client"
import { getFirestore } from 'firebase/firestore'
import React, { useEffect } from 'react'
import app from '../Shared/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore';
import UserInfo from '../components/UserInfo';
import PinList from '../components/Pins/PinList';

function Profile({ params }: any) {
    const db = getFirestore(app)

    const [userInfo, setUserInfo] = React.useState<any>(null)

    useEffect(() => {
        if (params) {
            getUserInfo(params.userId.replace('%40', '@'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

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
                <PinList userInfo={userInfo}  />
            </div> 
            :
            null
        }
    </div>
  )
}

export default Profile