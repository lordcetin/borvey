
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  gigId:any;
  offerId:any;
}

const IgnoreButton = ({gigId,offerId}: Props) => {
  const router = useRouter()
  const handleIgnore = async () => {
    const formData = new FormData()
    formData.append("gigId",gigId)
    formData.append("offerId",offerId)
    const { status } = await axios.post('/api/offers/ignoreOffer',formData)
    if(status === 200){
      return router.refresh()
    }
  }

  return (
    <div onClick={handleIgnore} className='flex h-[34px] items-center max-md:text-xs px-4 py-1 bg-red-600 hover:bg-red-700 transition-all text-white cursor-pointer rounded-lg box-border shrink-0'>
      <X className='text-lg'/>
      Teklifi Reddet
    </div>
  )
}

export default IgnoreButton