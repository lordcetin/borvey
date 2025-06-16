/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import qs from 'query-string'
import axios from 'axios';
import Image from 'next/image';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { sendNotification } from '@/utils/sendNotification';
import { File, Plus } from 'lucide-react';

type Props = {
  apiUrl: string;
  query: Record<string,any>;
  name: string;
  type: "conversation" | "channel";
}

const Input = ({apiUrl,query,name,type}: Props) => {
  const [inputVal,setInput] = useState("")
  const [openModal,setOpenModal] = useState(false);
  const [fileUrl,setFileUrl] = useState<any>("")
  const [selectedImage,setSelectedImage] = useState<any>("")
  const fileType = selectedImage?.split(".").pop();
  const isPDF = fileType === "pdf" && selectedImage;
  const isImage = !isPDF && selectedImage;
  
  const onSubmit = async () => {
    try {
      if(fileUrl){

      const formData = new FormData()
      formData.append('image',fileUrl)
      const {data} = await axios.post('/api/upload',formData)

      const url = qs.stringifyUrl({
        url:apiUrl,
        query,
      })
      await axios.post(url,{content:inputVal,fileUrl:selectedImage ? data?.fileUrl : null})
      setSelectedImage("")
      setFileUrl("")
      }else{
        const url = qs.stringifyUrl({
          url:apiUrl,
          query,
        })
        const {data,status} = await axios.post(url,{content:inputVal,fileUrl: null})

        if(status === 200){
          await sendNotification({senderId:data?.member?.profileId,senderName:data?.member?.profile?.fullName,senderImage:data?.member?.profile?.image,conversationId:data?.conversationId,content:data?.content})
        }
      }
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className='dark:bg-[#0a0d11] bg-white w-full flex-col flex justify-center items-center px-5 pb-9 max-md:pb-5'>
      {openModal && 
      <div className='w-[200px] p-2 rounded-sm dark:bg-neutral-800 bg-neutral-200 absolute bottom-12 left-5'>
        <label>
          <div className='flex items-center gap-x-2 p-2 dark:hover:bg-neutral-700 hover:bg-neutral-300 transition-all rounded cursor-pointer'>
            <svg className="optionIcon_ec5137" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13.82 21.7c.17.05.14.3-.04.3H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h7.5c.28 0 .5.22.5.5V5a5 5 0 0 0 5 5h2.5c.28 0 .5.22.5.5v2.3a.4.4 0 0 1-.68.27l-.2-.2a3 3 0 0 0-4.24 0l-4 4a3 3 0 0 0 0 4.25c.3.3.6.46.94.58Z" className=""></path><path fill="currentColor" d="M21.66 8c.03 0 .05-.03.04-.06a3 3 0 0 0-.58-.82l-4.24-4.24a3 3 0 0 0-.82-.58.04.04 0 0 0-.06.04V5a3 3 0 0 0 3 3h2.66ZM18.3 14.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L20 17.42V23a1 1 0 1 1-2 0v-5.59l-2.3 2.3a1 1 0 0 1-1.4-1.42l4-4Z" className=""></path></svg>
            <h1>Upload a file</h1>
          </div>
          <input
            className="hidden absolute h-52 -left-96"
            type="file"
            name="Asset"
            onChange={({target}) => {
              if(target.files){
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setFileUrl(file)
                setOpenModal(false)
              }
            }}
          />
          </label>
      </div>
      }
      <div className='dark:bg-[#191a1d] bg-[#dee3eb] flex-col items-center w-full rounded-lg px-3'>
      {isImage &&
      <div className='flex-col items-center w-full rounded-t-lg bg-[#191a1d] px-[10px] pt-[20px] pb-[10px]'>
        <div className='dark:bg-[#2B2D31] bg-[#dee3eb] p-2 rounded-md overflow-hidden whitespace-nowrap w-[216px] relative'>
          <div className='dark:bg-black bg-white flex items-center gap-x-2 absolute top-0 right-0 rounded-sm hover:shadow-md hover:shadow-black/50 transition-all p-2'>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M22.89 11.7c.07.2.07.4 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7Zm-4.5-3.62A15.11 15.11 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19c-2.8 0-4.87-1.38-6.39-3.08A15.11 15.11 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5c2.8 0 4.87 1.38 6.39 3.08Z" clipRule="evenodd" className=""></path></svg>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" className=""></path></svg>
            <svg onClick={() => {setFileUrl(""),setSelectedImage("")}} className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-red-600" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
          </div>
          <Image src={selectedImage} alt='' width={800} height={800} className='w-full h-[216px] rounded-md object-cover bg-[#414246]'/>
        </div>
        <div className='w-full h-[1px] bg-neutral-500 mt-2'></div>
      </div>
      }
      {isPDF &&
      <div className='flex-col items-center w-full rounded-t-lg bg-[#191a1d] px-[10px] pt-[20px] pb-[10px]'>
        <div className='bg-[#2B2D31] p-2 rounded-md overflow-hidden whitespace-nowrap w-[216px] relative'>
          <div className='dark:bg-black bg-white flex items-center gap-x-2 absolute top-0 right-0 rounded-sm hover:shadow-md hover:shadow-black/50 transition-all p-2'>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M22.89 11.7c.07.2.07.4 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7Zm-4.5-3.62A15.11 15.11 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19c-2.8 0-4.87-1.38-6.39-3.08A15.11 15.11 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5c2.8 0 4.87 1.38 6.39 3.08Z" clipRule="evenodd" className=""></path></svg>
            <svg className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-neutral-400" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="m13.96 5.46 4.58 4.58a1 1 0 0 0 1.42 0l1.38-1.38a2 2 0 0 0 0-2.82l-3.18-3.18a2 2 0 0 0-2.82 0l-1.38 1.38a1 1 0 0 0 0 1.42ZM2.11 20.16l.73-4.22a3 3 0 0 1 .83-1.61l7.87-7.87a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-7.87 7.87a3 3 0 0 1-1.6.83l-4.23.73a1.5 1.5 0 0 1-1.73-1.73Z" className=""></path></svg>
            <svg onClick={() => {setFileUrl(""),setSelectedImage("")}} className="actionBarIcon_b1fc5c cursor-pointer hover:text-white transition-all text-red-600" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" className=""></path><path fill="currentColor" fillRule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clipRule="evenodd" className=""></path></svg>
          </div>
          <div className='w-full h-[216px] rounded-md object-cover bg-[#414246]'>
            <File/>
            {fileUrl}
          </div>
        </div>
        <div className='w-full h-[1px] bg-neutral-500 mt-2'></div>
      </div>
      }

      <div className='dark:bg-[#191a1d] bg-[#dee3eb] flex items-center w-full rounded-lg px-3 space-x-4'>
        <Plus onClick={() => setOpenModal(!openModal)} className='dark:bg-white/60 dark:text-black bg-[#7e858d] text-white rounded-full size-8 shrink-0 p-1 cursor-pointer dark:hover:bg-white hover:bg-black' />
        <input
        type='text'     
        onKeyDown={(e:any) => {
          if (e.key === 'Enter') {
            onSubmit()
            setInput("")
          }
        }} 
        placeholder={name}
        value={inputVal}
        onChange={(e:any) => setInput(e.target.value)}
        className='w-full h-[44px] rounded-lg bg-transparent outline-none py-[9px] min-h-[44px] max-h-[150px]'/>

        <EmojiPicker onChange={(emoji:any) => setInput(`${inputVal == '' ? emoji : inputVal+" "+emoji}`)}/>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Input