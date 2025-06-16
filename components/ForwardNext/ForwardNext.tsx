/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRoleStore } from '@/store/useRoleStore';
import { useStepStore } from '@/store/useStepStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {}

const ForwardNext = () => {
  const service = useRoleStore((state) => state.service)
  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)
  const pathname = usePathname()

  return (
    <>
    {pathname === '/hizmet-ver' ?
    <>
    {currentStep === 0 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? <div onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</div>: <div></div>}
      <div onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></div>
    </div>}
    </>
    : pathname === '/panel/ilanlar' ?     
    <>
    {currentStep === 1 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? <div onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</div>: <div></div>}
      <div onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></div>
    </div>}
    </>
    : pathname === '/hizmet-al' ?     
    <>
    {currentStep === 2 ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? <div onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</div>: <div></div>}
      <div onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></div>
    </div>}
    </>
    :
    <>
    {currentStep === (service === 'service' ? 1 : 3) ? null :
    <div className='flex justify-between items-center w-full'>
      {currentStep > 0 ? <div onClick={() => setCurrentStep(currentStep - 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'><ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri</div>: <div></div>}
      <div onClick={() => setCurrentStep(currentStep + 1)} className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer group/btn2'>Devam Et <ChevronRight size={28} className='group-hover/btn2:translate-x-2 transition-all'/></div>
    </div>}
    </>
    }
    </>
  )
}

export default ForwardNext