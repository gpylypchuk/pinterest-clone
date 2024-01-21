import app from '@/app/Shared/firebaseConfig'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'

function PinList({ userInfo }: any) {
    const db = getFirestore(app)

    useEffect(() => {
        getUserPins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getUserPins = async () => {
        const q = query(collection(db, "pinteres-post"), where("email", "==", userInfo.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }
  return (
    <div>PinList</div>
  )
}

export default PinList