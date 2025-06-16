/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import AddressDetails from '@/components/AddressDetails/AddressDetails';
import FirmComplete from '@/components/FirmComplete/FirmComplete';
import ForwardNext from '@/components/ForwardNext/ForwardNext';
import Logo from '@/components/Logo/page';
import ProfileComplete from '@/components/ProfileComplete/ProfileComplete';
import TopBar from '@/components/TopBar/TopBar';
import TransportType from '@/components/TransportType/TransportType';
import TypeSelection from '@/components/TypeSelection/TypeSelection';
import { useRoleStore } from '@/store/useRoleStore';
import { useStepStore } from '@/store/useStepStore';
import React, { useEffect, useState } from 'react'

type Props = {}

const ServiceClient = (props: Props) => {
  const service = useRoleStore((state) => state.service)
  const setService:any = useRoleStore((state) => state.setService)
  
  useEffect(() => {
    setService("service")
  },[])

  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)

  let userData = [
    {
      title: "Başlarken"
    },
    {
      title: "Servisler",
    },
    {
      title: "Adres ve Detay",
    },
    {
      title: "Profilini Tamamla!",
    }
  ];

  const serviceData = [
    {
      title: "Başlarken"
    },
    {
      title: "Firma Profilini Tamamla!",
    },
  ];

  return (
  <div className='flex-col flex justify-center items-center w-full container mx-auto px-8 py-10'>
    <div className='flex justify-between items-center w-full'>
      <Logo/>
      <TopBar data={service === 'service' ? serviceData : userData} />
    </div>
      {service === 'service' ?
      <>
      {currentStep === 0 ?
      <FirmComplete/>
      : null}
      </>
      :<>
      {currentStep === 0 ?
      <TransportType/>
      : currentStep === 1 ?
      <AddressDetails/>
      : currentStep === 2 ?
      <ProfileComplete/>
      : null}
      </>}

      <ForwardNext/>
  </div>
  )
}

export default ServiceClient