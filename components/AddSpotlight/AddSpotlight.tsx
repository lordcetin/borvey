/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
  id:any;
  firmName:any;
  description:any;
  image:any;
}

const AddSpotlight = ({id,firmName,description,image}: Props) => {
  const router = useRouter()
  const [ spotData,setSpotData ] = useState([])



  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id',id)
    formData.append('firmName',firmName)
    formData.append('description',description)
    formData.append('image',image)
    const { status } = await axios.post('/api/spotlight/setSpot',formData)
    if(status === 200){
      router.push('/admin/kullanicilar')
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
    {spotData?.length === 16 ? null :
    <div onClick={handleSubmit} className='flex justify-end items-center w-fit px-3 py-1 cursor-pointer bg-amber-500 text-amber-950 font-semibold hover:bg-amber-600 transition-all rounded-md'>
      <h1>Öne Çıkar <span className='text-xs'>({spotData?.length}/16)</span></h1>
    </div>
    }
    </>
  )
}

export default AddSpotlight