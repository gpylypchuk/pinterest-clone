"use client";
import React from 'react'
import UploadImage from './UploadImage'
import UserTag from './UserTag'
import { useSession } from 'next-auth/react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../Shared/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Loading from '../../public/loading-indicator.png'
import { useRouter } from 'next/navigation';

function Form() {
    const {data: session} = useSession()
    
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [link, setLink] = React.useState('')
    const [image, setImage] = React.useState<File | null>(null)

    const [loading, setLoading] = React.useState(false)

    const router = useRouter();

    const storage = getStorage(app);

    const db = getFirestore(app);

    const postId = Date.now().toString();

    const onSave = () => {
        setLoading(true)
        console.log(title, description, link)
        uploadImage()
    }

    const uploadImage = async () => {
        const storageRef = ref(storage, 'pinterest/' + image?.name);
        uploadBytes(storageRef, image as Blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then((response) => {
            getDownloadURL(storageRef).then(async (url) => {
                console.log(url)
                const postData = {
                    title: title,
                    description: description,
                    link: link,
                    image: url,
                    user: session?.user?.name,
                    email: session?.user?.email,
                    userImage: session?.user?.image,
                }
                await setDoc(doc(db, "pinteres-post", postId), postData).then(() => {
                    console.log('Document written with ID: ', postId);
                    setLoading(true)
                    router.push('/'+session?.user?.email)
                });
            })
        }).catch((error) => {
            console.log(error)
        });
    }

  return (
    <div className='bg-white p-16 rounded-2x1'>
        <div className='flex justify-end mb-6'>
            <button className='bg-red-500 p-2 text-white font-semibold px-3 rounded-lg' onClick={() => onSave()}>
                {
                    loading ?
                    <Image
                        src={Loading}
                        alt='loading'
                        width={30}
                        height={30}
                        className='animate-spin'
                    />
                    :
                    <span>Save</span>
                }
            </button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            <UploadImage setImage={(image: any) => setImage(image)} />
            <div className='col-span-2'>
                <div className='w-[100%]'>
                    <input type='text' placeholder='Add your title' onChange={(e) => setTitle(e.target.value)}
                     className='text-[35px] outline-none font-bold w-full border-b-[2px] border-gray-400 placeholder-gray-400' />
                </div>
                <h2 className='text-[12px] w-full text-gray-400'>
                    The first 40 characters are what usually show up in the feed.
                </h2>
                <UserTag />
                <textarea 
                    placeholder='Tell everyone what your Pin is about' 
                    className='outline-none w-full mt-8 pb-4 text-[14px] border-b-[2px] border-gray-400 placeholder-gray-400'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input type='text' placeholder='Add a destination link' className='outline-none w-full pb-4 mt-[90px] border-b-[2px] border-gray-400 placeholder-gray-400' onChange={(e) => setLink(e.target.value)}/>
            </div>
        </div>
    </div>
  )
}

export default Form