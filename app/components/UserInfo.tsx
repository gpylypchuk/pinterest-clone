import Image from 'next/image'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function UserInfo({ userInfo }: any) {

  const router = useRouter();

  const {data: session} = useSession()

  const onLogoutClick = async () => {
    signOut();
    router.push('/');
  }

  return (
    <div className='flex flex-col items-center'>
        <Image 
            src={userInfo.image} 
            width={100} 
            height={100} 
            alt={'userImage'}
            className='rounded-full'
        />
        <h2 className='text-[30px] font-semibold'>{userInfo.name}</h2>
        <h2 className='text-gray-400'>{userInfo.email}</h2>
        <div className='flex gap-4'>
          <button className='bg-gray-200 mt-5 p-2 px-3 font-semibold rounded-full'>Share</button>
          {
            session?.user?.email === userInfo.email ?
            <button className='bg-gray-200 mt-5 p-2 px-3 font-semibold rounded-full' onClick={() => onLogoutClick()}>Logout</button>
            :
            null
          }
        </div>
    </div>
  )
}

export default UserInfo