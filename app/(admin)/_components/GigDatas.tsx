/* eslint-disable @typescript-eslint/no-explicit-any */
import TimeAgo from '@/components/TimeAgo'
import { ExternalLink } from 'lucide-react'
import React, { Fragment } from 'react'

type Props = {gig:any}

const GigDatas = ({gig}: Props) => {
  return (
    <div className='rounded-2xl border dark:border-white/10 border-black/10 box-border w-[400px] h-[291px] relative overflow-hidden'>
      <div className='flex justify-center items-center w-full h-20 absolute bottom-0 left-0 bg-linear-to-t to-transparent from-brandDark'></div>
      <div className='absolute top-0 right-0 cursor-pointer bg-white/60 hover:bg-white text-black w-12 size-8 flex justify-center items-center rounded-se-xl rounded-es-xl hover:w-34 gap-x-1 hover:before:w-fit hover:before:whitespace-nowrap hover:before:text-black hover:before:content-["Hepsini_Gör"] transition-all font-semibold'><ExternalLink size={23} /></div>
      <h1 className='font-bold text-xl mb-4 py-2 px-3 dark:text-white/50 text-black/50'>İlanlar</h1>
      <div className='flex-col items-center space-y-2 mt-9 px-3'>
      {gig?.slice(0,4).map((gig:any,index:any) => (
        <Fragment key={index}>
          <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
            <div className='flex items-center gap-x-2'>
              <h1 className='text-sm whitespace-nowrap w-12 overflow-hidden'>{gig.title}</h1>
            </div>
            <div className='text-sm flex items-center gap-x-6'>
              <h1 className='text-[12px]'>{gig?.transportype === 'evdenEve' ? "Evden Eve" : gig?.transportype === 'tekliUrun' ? "Parça Eşya" : gig?.transportype === 'ofis' ? "Ofis, Depo" : gig?.transportype === 'kisaMesafe' ? "Kısa Mesafe" : null}</h1>
            </div>
            <div className=''>
            <TimeAgo size={'14px'} timestamp={new Date(gig?.createdAt)?.getTime()}/>
            </div>
          </div>
        </Fragment>
      ))}
      </div>
    </div>
  )
}

export default GigDatas