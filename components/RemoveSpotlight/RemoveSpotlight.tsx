/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
  id:any;
}

const RemoveSpotlight = ({id}: Props) => {
  const router = useRouter()
  const [ spotData,setSpotData ] = useState([])



  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id',id)
    const { status } = await axios.post('/api/spotlight/deleteSpot',formData)
    if(status === 200){
      return router.refresh()
    }
  }

  useEffect(() => {
    const getSpotlight = async () => {
      const { data } = await axios.get('/api/spotlight')
      setSpotData(data)
    }
    getSpotlight()
  }, []);

  return (
    <>
    
    <div onClick={handleSubmit} className='flex justify-end items-center w-fit px-3 py-1 cursor-pointer bg-amber-500 text-amber-950 font-semibold hover:bg-amber-600 transition-all rounded-md'>
      <h1>Kaldır <span className='text-xs'>({spotData?.length}/16)</span></h1>
    </div>
    
    </>
  )
}

export default RemoveSpotlight