"use client";
import Image from 'next/image'
import React, { useEffect } from 'react'
import Logo from '../../public/logo.png'
import { HiBell, HiChat, HiSearch } from 'react-icons/hi'
import { signIn, useSession } from 'next-auth/react'
import app from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

function Header() {
    const { data: session } = useSession()

    const router = useRouter()

    const db = getFirestore(app)

    const onCreateClick = () => {
        if (session?.user?.email) {
            router.push('/pin-builder')
        } else {
            signIn()
        }
    }

    useEffect(() => {
        saveUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    const saveUserInfo = async () => {
        if (session?.user) {
            await setDoc(doc(db, "user", session?.user?.email as string), {
                name: session?.user?.name,
                image: session?.user?.image,
                email: session?.user?.email,
            })
        }
    }

    return (
    <div className='flex gap-3 md:gap-2 item-center p-6'>
        <Image 
            src={Logo} 
            width={50} 
            height={50} 
            alt={'logo'}
            className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
            onClick={() => router.push('/')}
        />
        <button className='bg-black text-white p-2 px-4 rounded-full hidden md:block' onClick={() => router.push('/')}>Home</button>
        <button className='font-semibold p-2 px-4 rounded-full' onClick={() => onCreateClick()}>Create</button>
        
        <div className='bg-[#e9e9e9] p-3 gap-3 item-center rounded-full w-full hidden md:flex'>
            <HiSearch className='text-[25px] text-gray-500' />
            <input type='text' placeholder='Search' className='bg-transparent outline-none' /> 
        </div>
        <HiSearch className='text-[25px] text-gray-500 md:hidden' />
        <HiBell className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer' />
        <HiChat className='text-[25px] md:text-[40px] text-gray-500 cursor-pointer' />
        {
            session?.user?.image ?
            <Image 
                src={session?.user?.image} 
                width={50} 
                height={50} 
                alt={'logo'}
                className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
                onClick={() => router.push('/'+session?.user?.email)}
            />
            :
            <button onClick={() => signIn()} className='font-semibold p-2 px-4 rounded-full'>Login</button> 
        }
    </div>
  )
}

export default Header