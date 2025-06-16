/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useAddressStore from '@/store/useAddressStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useStepStore } from '@/store/useStepStore';
import { useTransport } from '@/store/useTransport';
import useValid from '@/store/useValid';
import useValidForm from '@/store/useValidForm';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {}

const ForwardNext = () => {
  const service = useRoleStore((state) => state.service)
  const transportype = useTransport((state) => state.transportype)
  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)
  const { isValid , setIsValid } = useValidForm()
  const pathname = usePathname()

  return (
    <>
    {pathname === '/hizmet-ver' ?
    <>
    {currentStep === 0 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? 
      <button onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</button>
      : <div></div>}
      <button disabled={isValid === false} onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></button>
    </div>}
    </>
    : pathname === '/panel/ilanlar' ?     
    <>
    {currentStep === 1 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? 
      <button onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</button>
      : <div></div>}
      <button disabled={isValid === false} onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></button>
    </div>}
    </>
    : pathname === '/hizmet-al' ?     
    <>
    {currentStep === 2 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? 
      <button onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</button>
      : <div></div>}
      <button disabled={isValid === false} onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></button>
    </div>}
    </>
    :
    <>
    {currentStep === (service === 'service' ? 1 : 3) ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? 
      <button onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</button>
      : <div></div>}
      <button disabled={isValid === false} onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></button>
    </div>}
    </>
    }
    </>
  )
}

export default ForwardNext