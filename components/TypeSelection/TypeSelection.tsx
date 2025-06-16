/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useRoleStore } from '@/store/useRoleStore';
import useValidForm from '@/store/useValidForm';
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}

const TypeSelection = () => {
  const service = useRoleStore((state) => state.service)
  const setService = useRoleStore((state) => state.setService)
  const { isValid , setIsValid } = useValidForm()
  return (
    <div className='flex justify-center items-center w-full gap-x-4 mt-10 mb-20'>

      <div onClick={() => {setService("customer"),setIsValid(true)}} className={`w-[50%] h-[584px] max-md:h-[650px] flex-col items-center py-7 px-5 rounded-3xl cursor-pointer border dark:hover:border-blue-500 hover:border-blue-400 ${service === 'customer' ? "dark:bg-blue-600 bg-blue-500/50 border-2 border-blue-500" : "border dark:border-white/20 border-black/30"}`}>
        <div className='flex items-center w-full gap-x-2'>
          <div className={`rounded-full size-6 transition-all max-md:whitespace-nowrap max-md:shrink-0 ${service === 'customer' ? "border-4 border-blue-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
          <h1 className='text-4xl font-bold max-md:text-sm'>Hizmet Almak İstiyorum</h1>
        </div>
        <div className='flex justify-center items-center w-full mt-20 mb-10'>
          <Image src={'/assets/customer_illustration.png'} width={800} height={800} alt='Müşteri' className='object-cover w-80 select-none pointer-events-none'/>
        </div>
        <div className='flex justify-center items-center w-full text-center'>
          <p className='w-[500px] text-black/80 dark:text-white/80 max-md:w-full'>Hizmet almak istiyorsanız, ihtiyacınıza uygun profesyonellerle hızlı ve kolay bir şekilde bağlantı kurabilirsiniz. İhtiyaçlarınızı belirleyin ve size en uygun çözümleri bulun.</p>
        </div>
      </div>

      <div onClick={() => {setService("service"),setIsValid(true)}} className={`w-[50%] h-[584px] max-md:h-[650px] flex-col items-center py-7 px-5 rounded-3xl cursor-pointer border dark:hover:border-amber-500 hover:border-amber-400 ${service === 'service' ? "dark:bg-amber-600 bg-amber-500/50 border-2 border-amber-500" : "border dark:border-white/20 border-black/30"}`}>
        <div className='flex items-center w-full gap-x-2'>
          <div className={`rounded-full size-6 transition-all max-md:whitespace-nowrap max-md:shrink-0 ${service === 'service' ? "border-4 border-amber-500 dark:bg-[#0a0d11] bg-white" : "border dark:border-white/30 border-black/30"}`}></div>
          <h1 className='text-4xl font-bold max-md:text-sm'>Hizmet Vermek İstiyorum</h1>
        </div>
        <div className='flex justify-center items-center w-full mt-20 mb-10'>
          <Image src={'/assets/service_illustration.png'} width={800} height={800} alt='Müşteri' className='object-cover w-80 select-none pointer-events-none'/>
        </div>
        <div className='flex justify-center items-center w-full text-center'>
          <p className='w-[500px] text-black/80 dark:text-white/80 max-md:w-full'>borvey’de istediğin güzergah ve tarihte yük bulmak için ücretsiz üye olman yeterli. Uygun yük ve taşıma taleplerini senin için borvey bulsun, aracın boş kalmasın.</p>
        </div>
      </div>

    </div>
  )
}

export default TypeSelection