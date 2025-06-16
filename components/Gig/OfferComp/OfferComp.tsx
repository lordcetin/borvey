/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import TimeAgo from '@/components/TimeAgo';
import MessageButton from '@/components/MessageButton/MessageButton';
import IgnoreButton from '../IgnoreButton/IgnoreButton';
import { useSession } from 'next-auth/react';
import { useChatQuery } from '@/hook/useChatQuery';
import { useChatSocket } from '@/hook/useChatSocket';
import { useChatScroll } from '@/hook/useChatScroll';
import { motion } from "framer-motion";
import axios from 'axios';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';

type Props = {
  teklif:any;
  index:any;
}

const OfferComp = ({teklif,index}: Props) => {
  const {data:session}:any = useSession()
  const createdAt = new Date(teklif.createdAt)?.getTime()
  const user = teklif?.profiles;
  const [offered,setOffered]:any = useState([]);
  const [selected,setSelected] = useState<any>(null);

  useEffect(() => {
    const getOffr = async () => {
      const { data } = await axios.get(`/api/offers/offeredUser?offeredUserId=${teklif?.offeredUserId}`);
      setOffered(data); 
    }
    getOffr()
  }, []);

  const readableTime = formatDistanceToNowStrict(new Date(Number(teklif?.time)), {
    addSuffix: false,
    locale: tr,
  });

// const formatted = new Intl.NumberFormat('tr-TR', {
//   style: 'currency',
//   currency: 'TRY', // Türk Lirası için doğru kod
//   notation: 'compact', // Kısa format (örneğin, 1M)
//   compactDisplay: 'short', // Kısa gösterim (örneğin, 1M yerine 1 milyon)
// }).format(teklif?.price ?? 0); // Fallback olarak 0 kullan

const formatted = Number(teklif?.price).toLocaleString('tr-TR', { maximumFractionDigits: 6 })


  return (
  <>
  <motion.div
  initial={{ y: "100%", opacity: Number(`0.${5 + index}`) }}
  animate={{ y: "0%", opacity: 1 }}
  exit={{ y: "-100%", opacity: Number(`0.${5 + index}`) }}
  transition={{
    duration: Number(`0.${5 + index}`),
    ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
  }}
  className="flex-col items-center border dark:border-white/5 border-black/50 rounded-xl p-5 w-full relative dark:bg-[#13171b] bg-[#deebf8]">
    <div className='justify-between items-center w-full mb-2 hidden max-md:flex'>
      <div className='flex items-center gap-x-2'>
      <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer'>
        <Image src={user?.image} alt={user?.firmName} width={800} height={800} className='object-cover size-6 shrink-0 rounded-full border dark:border-white/30 border-black/40'/>
        <h1>{user?.firmName}</h1>
      </div>
      <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer'>
        <Image src={offered?.image} alt={offered?.fullName} width={800} height={800} className='object-cover size-6 shrink-0 rounded-full border dark:border-white/30 border-black/40'/>
        <h1>{session?.user?.id === offered?.id ? "Sen" : offered?.fullName}</h1>
      </div>
      </div>
    </div>
    <div className='absolute right-3 top-2 '>
      <TimeAgo size={'14px'} timestamp={createdAt}/>
    </div>
    <div className='flex-col items-center space-y-2'>
      <div className='flex items-center gap-x-2'>
        {session?.user?.firmStatus ? 
        <div className='flex items-center gap-x-2 max-md:hidden'>
        <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer'>
          <Image src={user?.image} alt={user?.firmName} width={800} height={800} className='object-cover size-6 shrink-0 rounded-full border dark:border-white/30 border-black/40'/>
          <h1>{session?.user?.id === user?.id ? "Sen" : user?.firmName}</h1>
        </div>
        <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer'>
          <Image src={offered?.image} alt={offered?.fullName} width={800} height={800} className='object-cover size-6 shrink-0 rounded-full border dark:border-white/30 border-black/40'/>
          <h1>{offered?.fullName}</h1>
        </div>
        </div>
        :<div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer max-md:hidden'>
          <Image src={user?.image} alt={user?.firmName} width={800} height={800} className='object-cover size-6 shrink-0 rounded-full border dark:border-white/30 border-black/40'/>
          <h1>{user?.firmName}</h1>
        </div>}
        <h1 className='text-2xl font-bold max-md:hidden flex'>{formatted}₺ - {readableTime}</h1>
        <div className=' justify-between items-center w-full hidden max-md:flex'>
          <h1 className='text-2xl font-bold'>{formatted}₺ - {readableTime}</h1>
          <div className='max-md:hidden flex'><TimeAgo size={'14px'} timestamp={createdAt}/></div>
        </div>
      </div>
      <div className={`border dark:border-white/20 border-black/20 p-2 rounded-md whitespace-pre-wrap flex flex-wrap ${selected === index ? "max-h-40 overflow-x-hidden overflow-y-auto" : "max-h-21 overflow-hidden"} relative`}>
        {teklif?.offerText}
      </div>
      {teklif?.offerText?.length >= 595 && 
      <div className='flex justify-end items-center w-full'>
        <button type='button' onClick={() => selected === null ? setSelected(index) : setSelected(null)} className={`${selected === null ? "" : ""} dark:bg-neutral-800 bg-amber-300/30 dark:text-white/70 text-black/70 border dark:border-white/20 border-black/20 cursor-pointer px-3 py-1 rounded-md font-bold text-sm flex items-center gap-x-1`}><ChevronDown size={18} className={selected === index ? "rotate-180 transition-all" : "rotate-0 transition-all"}/> {selected === index ? "Daha Az" : "Daha Fazla"}</button>
      </div>}
    </div>
    <div className='flex justify-between max-md:justify-normal items-center mt-5 w-full'>
      <div></div>
      <div className='flex items-center gap-x-4'>
        {teklif?.status === "denied" && <h1 className='text-sm px-3 py-1 rounded-md dark:text-white/30 text-black/70 bg-black/20'>Reddettin</h1>}
        {session?.user?.id === user?.id && <div className={` px-4 py-1 rounded-md dark:bg-neutral-800 bg-blue-100 dark:text-white/40 text-black/50 cursor-default text-sm max-md:text-xs whitespace-nowrap`}>{teklif?.status === 'denied' ? "Reddedildi" : "Teklifin İnceleniyor"}</div>}
        {session?.user?.id !== user?.id && teklif?.status !== "denied" && <MessageButton id={user?.id} gigId={teklif?.gigId} />}
        {session?.user?.id !== user?.id && teklif?.status !== "denied" && <IgnoreButton gigId={teklif?.gigId} offerId={teklif?.id}/>}
      </div>
    </div>

  </motion.div>
  </>
  )
}

export default OfferComp