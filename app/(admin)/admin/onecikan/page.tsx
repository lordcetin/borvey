/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth'
import { isEmpty } from 'lodash'
import { redirect } from 'next/navigation'
import { DataTableSpotlight } from '@/components/DataTable/DataTableSpotlight'
import { CaptionsOff } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const Spot = async (props: Props) => {
  const session:any = await auth()
  const spotlight:any = await prismadb.spotlight.findMany()

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
    <>
    {isEmpty(spotlight) ? 
    <div className='flex justify-center items-center w-full h-[calc(100vh-250px)]'>
      <div className='flex-col flex justify-center items-center w-full space-y-4'>
          <CaptionsOff size={150} className='dark:text-neutral-700 text-black/70'/>
          <h1 className='dark:text-white/30 text-black/70 text-xl font-semibold'>Henüz hiç öne çıkarılan yok.</h1>
          <Link title='Admin' href={'/admin'} className='rounded-full dark:bg-white/50 bg-black/50 dark:text-black text-white dark:hover:bg-white hover:bg-black px-8 py-2 font-semibold transition-all'>Geri Dön</Link>
      </div>
    </div>
    :
    <div className='flex justify-center items-center w-full container mx-auto'>
      <DataTableSpotlight data={spotlight}/>
    </div>
    }
    </>
  )
}
}

export default Spot