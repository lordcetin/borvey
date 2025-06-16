/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useGigCreate from '@/store/useGigCreate'
import TopBar from '@/components/TopBar/TopBar'
import { useStepStore } from '@/store/useStepStore'
import { useRoleStore } from '@/store/useRoleStore'
import TransportType from '@/components/TransportType/TransportType'
import AddressDetails from '@/components/AddressDetails/AddressDetails'
import ForwardNext from '@/components/ForwardNext/ForwardNext'
import { useTransport } from '@/store/useTransport'
import useAddressStore from '@/store/useAddressStore'
import axios from 'axios'
import { Check, ChevronLeft, X } from 'lucide-react'
type Props = {}

const GigCreateComp = (props: Props) => {
  const { setGigCreate } = useGigCreate()
  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)
  const service = useRoleStore((state) => state.service)
  const setService:any = useRoleStore((state) => state.setService)
  const transportype = useTransport((state) => state.transportype)
  const setTransportType = useTransport((state) => state.setTransportType)
  const { addressDetails, setAddressDetails } = useAddressStore()
  const [ loading,setLoading ] = useState(false);

  console.log("service",service,"\ntransportType",transportype,"\naddressDetails",addressDetails)
  
  useEffect(() => {
    setService("customer")
    setCurrentStep(0)
  },[])

    let userData = [
    {
      title: "Başlarken"
    },
    {
      title: "Servisler",
    },
    {
      title: "İlan Eklemeyi Tamamla!",
    }
  ];

  const handleSubmit = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("title", String(addressDetails?.title))
    formData.append("description", String(addressDetails?.description))
    formData.append("provinceFrom", String(addressDetails?.provinceFrom))
    formData.append("provinceTo", String(addressDetails?.provinceTo))
    formData.append("districtFrom", String(addressDetails?.districtFrom))
    formData.append("districtTo", String(addressDetails?.districtTo))
    formData.append("service", String(service))
    formData.append("transportype", String(transportype))

    const { status } = await axios.post('/api/gig/sendGig',formData)
    if(status === 200){
      setLoading(false)
      setGigCreate(false)
    }
  }

  return (
    <motion.div 
    initial={{ y: "100%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "-100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
    }}
    className='dark:bg-[#0c1014] bg-white flex-col items-center rounded-3xl w-full h-[calc(100vh-124px)] z-[9999] absolute left-0 top-0 border dark:border-white/10 border-black/50'
    >
    <div className='flex justify-between items-center w-full px-3 py-3'>
      <h1 className='font-bold ml-2 text-xl'>İlan Ekle</h1>
      <TopBar data={userData} />
      <X onClick={() => setGigCreate(false)} size={28} className='dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black cursor-pointer'/>
    </div>
    <div className='flex-col flex justify-center items-center w-full px-8'>

      {currentStep === 0 ?
      <TransportType/>
      : currentStep === 1 ?
      <AddressDetails/>
      : null}

      {currentStep === 1 && (
        <div className='flex justify-between items-center w-full'>
          {currentStep > 0 ? (
            <div
              onClick={() => setCurrentStep(currentStep - 1)}
              className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'
            >
              <ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri
            </div>
          ) : (
            <div></div>
          )}
          <button
            type='button'
            onClick={() => handleSubmit()}
            disabled={loading}
            className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer'
          >
            Kaydı Tamamla <Check size={28} className='translate-x-2 transition-all'/>
          </button>
        </div>
      )}


      <ForwardNext/>

    </div>
    </motion.div>
  )
}

export default GigCreateComp