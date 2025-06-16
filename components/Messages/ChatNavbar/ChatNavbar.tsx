/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { format } from 'date-fns';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react'
import Offers from '../Offers/Offers';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DATE_FORMAT = 'd.MM.yyyy HH:mm';

type Props = {
  conversations:any;
  conversationId:any;
  offer:any;
  firm:any;
  comment:any;
}

const ChatNavbar = ({conversations,conversationId,offer,firm,comment}: Props) => {
  const pathname = usePathname()
  const [ convModal,setConvModal ] = useState(false);
  const [ offerModal,setOfferModal ] = useState(false);

  return (
    <>
    <div className='max-md:flex hidden justify-between items-center w-full relative bottom-5 px-3'>
      <div onClick={() => setConvModal(!convModal)} className={convModal ? 'flex items-center gap-x-1 border border-amber-500 text-amber-500 rounded-md px-3 py-1' : 'flex items-center gap-x-1 border dark:border-white/30 border-black/30 rounded-md px-3 py-1'}><ChevronLeft className={convModal ? "rotate-90 transition-all" : "rotate-0 transition-all"}/> Görüşme</div>
      <div onClick={() => setOfferModal(!offerModal)} className={offerModal ? 'flex items-center gap-x-1 border border-amber-500 text-amber-500 rounded-md px-3 py-1' :'flex items-center gap-x-1 border dark:border-white/30 border-black/30 rounded-md px-3 py-1'}>Teklif <ChevronRight className={offerModal ? "rotate-90 transition-all" : "rotate-0 transition-all"}/></div>
    </div>
    {convModal &&
    <div className={`h-[calc(100vh-125px)] overflow-y-auto w-90 z-[999999] absolute top-33 dark:bg-brandDark bg-white rounded-b-3xl flex-col`}>
    <div className='flex justify-center items-center w-full px-3'>
      <div className='w-full h-[28px] flex items-center dark:bg-[#161a20] bg-neutral-200 rounded-sm px-2 border dark:border-white/20 border-black/30 my-2'>
        <input type="text" className='bg-transparent outline-none w-full placeholder:text-neutral-500 text-sm' placeholder='Kullanıcı Ara' />
        <svg className="icon_effbe2 visible_effbe2 cursor-pointer" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clipRule="evenodd" className=""></path></svg>
      </div>
    </div>
    {conversations?.reverse()?.map((item:any,index:any) => {
      // const directM:any = await prismadb.directMessage.findMany({
      //   where:{
      //     conversationId:item?.id
      //   }
      // })
      const timestamp = isEmpty(item?.directMessages[item?.directMessages?.length - 1]?.createdAt) ? new Date() : item?.directMessages[item?.directMessages?.length - 1]?.createdAt

      return (
        <Fragment key={index}>
          <div className={`flex justify-between items-center w-full overflow-x-hidden overflow-y-auto group transition-all dark:hover:bg-[#1d222b] hover:bg-[#dee3eb] p-3 cursor-pointer gap-x-4 nth-3:border-b nth-[3n+1]:border-b dark:border-white/20 border-black/30 ${conversationId === item?.id && "dark:bg-[#161a20] bg-[#dee3eb]"}`}>
            <div className="w-9 whitespace-nowrap shrink-0 relative">
              <Link title='Profil Görseli' href={`/panel/mesajlar/${item?.id}`}><Image src={item?.memberTwo?.profile?.image} width={800} height={800} alt={item?.memberTwo?.profile?.fullName} className='size-9 rounded-full object-cover opacity-80 group-hover:opacity-100'/></Link>
              <span className='size-3 rounded-full absolute right-0 bottom-0 bg-green-500'></span>
            </div>
            <div className='flex-col items-center gap-x-2 w-[300px]'>
              <Link title='Profil Adı' href={`/panel/mesajlar/${item?.id}`} className='dark:text-white/80 text-black/60 dark:group-hover:text-white group-hover:text-black transition-all truncate font-semibold'>{item?.memberTwo?.profile?.fullName}</Link>
              <div className='truncate text-xs dark:text-white/50 text-black/50 dark:group-hover:text-white/70 group-hover:text-black'>{item?.directMessages?.content}</div>
            </div>
            <div className='text-[11px] dark:text-white/20 text-black/70 dark:group-hover:text-white/50 group-hover:text-black/50 whitespace-nowrap box-content'>{format(new Date(timestamp), DATE_FORMAT)}</div>
          </div>
        </Fragment>
      )
    })}
    </div>
    }
    {offerModal &&
    <div className='h-[calc(100vh-123px)] p-3 overflow-y-auto w-90 z-[999999] absolute top-33 dark:bg-brandDark bg-white rounded-b-3xl flex-col'>
      <Offers offer={offer} firm={firm} comment={comment}/>
    </div>
    }
    </>
  )
}

export default ChatNavbar