/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from '@/auth'
import InputOTP from '@/components/Input/InputOTP'
import { isEmpty } from 'lodash'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:any
}

const Activation = async ({params}: Props) => {
  const param = await params
  const code = param?.code
  const session = await auth()

  const existUser = await prismadb.user.findUnique({
    where:{
      id:session?.user?.id
    }
  })

  if(!isEmpty(code) && existUser?.code === code){

  const user:any = await prismadb?.user?.update({
    where:{id:session?.user?.id},
    data:{
      verified:true
    }
  })

    if(user?.service === 'customer'){
      redirect('/panel/teklifler')
    }else{
      redirect('/panel/ilanlar')
    }
  }else{
    
  }
  

  return (
    <div className='flex justify-center items-center w-full container mx-auto my-20 relative p-44'>

      <div className='flex-col flex justify-center items-center w-3/6 rounded-3xl dark:bg-black/95 bg-white/95 border border-teal-900 p-20 z-999'>
        <h1 className='text-3xl font-bold'>Aktivasyon Kodu</h1>
        <p className='dark:text-white/30 text-black/50 mt-3 mb-12'>Mailinize gönderilen kodu girebilir ya da aktivasyon linkine tıklayabilirsiniz.</p>
        <InputOTP/>
      </div>
      <div className='flex justify-center items-center w-full absolute z-0'>
        <div className='size-96 rounded-full bg-radial-[at_50%_75%] to-brandDark from-teal-500 blur-[150px]'></div>
      </div>
    </div>
  )
}

export default Activation