/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios'
import { MessageSquareMore } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  id:any;
  gigId:any;
}

const MessageButton = ({id,gigId}: Props) => {

  const router = useRouter()

  
  const handleMessage = async () => {
    const { data,status } = await axios.post(`/api/generateConversationId`, {profileId:id})
    if(status === 200){
      router.push(`/panel/mesajlar/${data}`)
    }else{
      return
    }
  } 

  return (
    <>
    <button 
    type="button" 
    onClick={() => handleMessage()} 
    className="border bg-blue-500 h-[34px] px-4 max-md:text-xs py-1 rounded-lg flex items-center gap-x-1 whitespace-nowrap shrink-0 hover:bg-blue-600 transition cursor-pointer">
      <MessageSquareMore className='text-lg max-md:text-sm'/> 
      Mesaj At
    </button> 
    </>
  )
}

export default MessageButton