/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Offer from '@/components/Offer/Offer'
import useOpenOfferModal from '@/store/useOfferModal'
import Tippy from '@tippyjs/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { isEmpty } from 'lodash'
import { useAppContext } from '@/context/AppContext'
import TimeAgo from '@/components/TimeAgo'
import { ChevronDown, Handshake } from 'lucide-react'


type Props = {
  user:any
  ilan:any
  index:any
}

const GigComp = ({user,ilan,index}: Props) => {
  const { openOfferModal, setOpenOfferModal } = useOpenOfferModal()
  const { data:session }:any = useSession();
  const { setIlanId } = useAppContext()
  const [ selected,setSelected ] = useState<any>(null);

  const [timestamp, setTimestamp] = useState<number | null>(null);

  const handleDateChange = (newTimestamp: number) => {
    setTimestamp(newTimestamp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seçilen tarih (timestamp):", timestamp);
    // Burada backend'e gönderme işlemini yapabilirsin
  };

  return (
  <>

  {session?.user?.id !== ilan?.profileId && <Offer profileId={user?.id} gigId={ilan?.id} user={user} ilan={ilan}/>}

  <motion.div 
  initial={{ y: "100%", opacity: Number(`0.${5 + index}`) }}
  animate={{ y: "0%", opacity: 1 }}
  exit={{ y: "-100%", opacity: Number(`0.${5 + index}`) }}
  transition={{
    duration: Number(`0.${5 + index}`),
    ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
  }}
  className={`${openOfferModal ? "flex-col items-center rounded-xl p-5 w-full relative" : "flex-col items-center border dark:border-white/5 border-black/30 rounded-xl p-5 w-full relative dark:bg-[#13171b] bg-amber-200/30"} `}>
    <div className='flex justify-between items-center w-full'>
      <div className='relative bottom-2'>
        <TimeAgo timestamp={new Date(ilan?.createdAt)?.getTime()} size={"14px"}/>
      </div>
      <div>
        <h1 className={` ${
          ilan?.transportype === 'evdenEve' ? "bg-amber-500 text-amber-950" 
          : ilan?.transportype === 'tekliUrun' ? "bg-teal-500 text-teal-950" 
          : ilan?.transportype === 'ofis' ? "bg-blue-500 text-blue-950" 
          : ilan?.transportype === 'kisaMesafe' 
          ? "bg-neutral-500 text-neutral-100" 
          : ""} px-3 py-1 rounded-md font-semibold text-sm max-md:text-xs cursor-pointer w-fit`}>
            {ilan?.transportype === 'evdenEve' 
            ? "Evden Eve Nakliyat" : ilan?.transportype === 'tekliUrun' 
            ? "Parça Eşya Nakliyat" : ilan?.transportype === 'ofis' 
            ? "Ofis, Depo Nakliyat" : ilan?.transportype === 'kisaMesafe' 
            ? "Kısa Mesafe Nakliyat" : null}
        </h1>
      </div>
    </div>
    
    <div className='flex-col items-center space-y-2 relative'>
      <div className='flex justify-between items-center w-full'>
        <div className=' items-center gap-x-2 dark:bg-neutral-800 bg-amber-200/30 rounded-md px-2 py-1 border dark:border-white/5 border-black/30 cursor-pointer hidden max-md:flex'>
          <Image src={user?.image} alt={user?.fullName} width={800} height={800} className='object-cover size-6 rounded-full border dark:border-white/30 border-black/40'/>
          <h1 className='max-md:text-xs'>{session?.user?.id === user?.id ? "Sen" : user?.fullName}</h1>
        </div>
        <h1 className='bg-amber-500 px-3 py-1 rounded-md text-amber-950 font-semibold text-sm cursor-pointer w-fit max-md:text-xs hidden '>{ilan?.transportype === 'evdenEve' ? "Evden Eve Nakliyat" : ilan?.transportype === 'tekliUrun' ? "Parça Eşya Nakliyat" : ilan?.transportype === 'ofis' ? "Ofis, Depo Nakliyat" : ilan?.transportype === 'kisaMesafe' ? "Kısa Mesafe Nakliyat" : null}</h1>
      </div>
      <div className='flex items-center gap-x-2'>
        <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-amber-200/30  rounded-md px-2 py-1 border dark:border-white/5 border-black/30 cursor-pointer max-md:hidden'>
          <Image src={user?.image} alt={user?.fullName} width={800} height={800} className='object-cover size-6 rounded-full border dark:border-white/30 border-black/40'/>
          <h1>{session?.user?.id === user?.id ? "Sen" : user?.fullName}</h1>
        </div>
        <h1 className='text-2xl font-bold'>{ilan?.title}</h1>
      </div>
      <div className={`border dark:border-white/20 border-black/20 p-2 rounded-md whitespace-pre-wrap flex flex-wrap ${selected === index ? "max-h-40 overflow-x-hidden overflow-y-auto" : "max-h-21 overflow-hidden"} relative`}>
        {ilan?.description}
      </div>
      {ilan?.description?.length >= 595 && 
      <div className='flex justify-end items-center w-full'>
        <button type='button' onClick={() => selected === null ? setSelected(index) : setSelected(null)} className={`${selected === null ? "" : ""} dark:bg-neutral-800 bg-amber-300/30 dark:text-white/70 text-black/70 border dark:border-white/20 border-black/20 cursor-pointer px-3 py-1 rounded-md font-bold text-sm flex items-center gap-x-1`}><ChevronDown size={18} className={selected === index ? "rotate-180 transition-all" : "rotate-0 transition-all"}/> {selected === index ? "Daha Az" : "Daha Fazla"}</button>
      </div>}
    </div>
    <div className='flex justify-between items-center mt-5 w-full'>
      <div className='flex items-center max-md:flex-col'>
        <div className='flex items-center gap-x-2 px-3 py-2 border dark:border-white/20 border-black/20 text-sm dark:bg-neutral-800 bg-amber-300/30 rounded-lg cursor-pointer max-md:text-xs'><h1 className='font-bold dark:text-white/30 text-black/70 max-md:text-[8px]'>NEREDEN:</h1><h1 className='text-xs max-md:text-[8px] whitespace-nowrap'>{ilan?.provinceFrom} / {ilan?.districtFrom}</h1></div>
        <div className='flex items-center w-7 h-[1px] border-t border-dashed dark:border-white/30 border-black/30 max-md:hidden'></div>
        <div className='items-center w-[1px] h-3 border-r border-dashed dark:border-white/30 border-black/30 hidden max-md:flex'></div>
        <div className='flex items-center gap-x-2 px-3 py-2 border dark:border-white/20 border-black/20 text-sm dark:bg-neutral-800 bg-amber-300/30 rounded-lg cursor-pointer max-md:text-xs'><h1 className='font-bold dark:text-white/30 text-black/70 max-md:text-[8px]'>NEREYE:</h1><h1 className='text-xs max-md:text-[8px] whitespace-nowrap'>{ilan?.provinceTo} / {ilan?.districtTo}</h1></div>
      </div>
      <div className='flex items-center gap-x-4 max-md:gap-x-2 max-md:flex-col max-md:space-y-2'>
        <div className='flex max-md:flex-col items-center gap-x-2'>
          {ilan?.offers?.length !== 0 && <h1 className='text-sm dark:text-white/50 text-black/40 max-md:text-xs'>{ilan?.offers?.length} kişi teklif verdi</h1>}
          <div className='flex -space-x-4 max-w-24 shrink-0 max-md:mt-2'>
          {ilan?.offers?.map((teklif:any,index:any) => {

            return (
              <Fragment key={index}>
                <Tippy content={teklif?.profiles?.firmName}><Image src={teklif?.profiles?.image} alt={teklif?.profiles?.firmName} style={{ zIndex: Number(teklif?.length - index) }} width={800} height={800} className='object-cover size-9 rounded-full border dark:border-white/30 border-black/40 cursor-pointer max-md:size-6'/></Tippy>
              </Fragment>
            )
          })}
          </div>
        </div>
        
        {!isEmpty(ilan?.offers?.filter((u:any) => u?.profiles?.firmName === session?.user?.firmName)) ? 
        <div className='px-4 py-1 rounded-md dark:bg-neutral-800 bg-blue-100 dark:text-white/40 text-black/50 cursor-default text-sm max-md:text-xs whitespace-nowrap'>{ilan?.offers?.filter((u:any) => u?.profiles?.firmName === session?.user?.firmName)?.[0]?.status === 'denied' ? "Reddedildi" : "Teklifin İnceleniyor"}</div>
        :  
        <button 
        onClick={() => {setOpenOfferModal(true),setIlanId(ilan?.id)}} 
        className={session?.user?.firmStatus === true ? 'bg-amber-600 hover:bg-amber-700 transition-all px-4 py-1 rounded-lg text-white font-bold cursor-pointer flex items-center gap-x-2 text-sm whitespace-nowrap' : 'hidden'}
        ><Handshake size={25}/> Teklif Ver</button> 
        }
      </div>
    </div>

  </motion.div>
  </>
  )
}

export default GigComp