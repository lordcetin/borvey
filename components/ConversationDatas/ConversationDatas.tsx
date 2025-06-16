/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import React, { Fragment } from 'react'
import TimeAgo from '../TimeAgo';
import { ExternalLink } from 'lucide-react';

type Props = {
  conversation:any;
}

const ConversationDatas = ({conversation}: Props) => {

  console.log("conversation",conversation)

  return (
    <div className='w-full self-start p-5 relative'>
      <div className='flex justify-center items-center w-full h-20 absolute bottom-0 left-0 bg-linear-to-t to-transparent from-brandDark'></div>
      <div className='absolute top-0 right-0 cursor-pointer bg-white/60 hover:bg-white text-black w-12 size-8 flex justify-center items-center rounded-se-xl rounded-es-xl hover:w-34 gap-x-1 hover:before:w-fit hover:before:whitespace-nowrap hover:before:text-black hover:before:content-["Hepsini_Gör"] transition-all font-semibold'><ExternalLink size={23} /></div>
      <h1 className='font-bold text-xl mb-4 dark:text-white/50 text-black/50'>Görüşmeler</h1>
      {/* <div className='flex flex-wrap whitespace-pre-wrap gap-x-2 space-y-2'>  
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Kullanıcı: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.length}</strong></div>
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Müşteri: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.filter((u:any) => u?.firmStatus === false)?.length}</strong></div>
        <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30'>Toplam Firma: <strong className='dark:text-white/50 text-black/50'>{data.pages[0]?.data?.filter((u:any) => u?.firmStatus === true)?.length}</strong></div>
      </div> */}
      <div className='flex-col items-center space-y-2 mt-5'>
      {/* {isSuccess && (
        <>
          {data.pages.map((page:any, x:any) => (
            <Fragment key={x}>
              {page.data?.slice(0)?.filter((u:any) => u?.firmStatus === false).map((user:any,index:any) => (
                <Fragment key={index}>
                  <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
                    <div className='flex items-center gap-x-2'>
                      <Image src={user?.image} alt='' width={800} height={800} className='size-6 rounded-full border dark:border-white/30 border-black/30'/>
                      <h1>{user.fullName}</h1>
                    </div>
                    <div className='text-sm'>
                      {user?.provinceFrom}
                    </div>
                    <div className=''>
                    <TimeAgo size={'14px'} timestamp={new Date(user?.createdAt)?.getTime()}/>
                    </div>
                  </div>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </>
      )} */}

      {conversation?.slice(0,7)?.map((conv:any,index:any) => (
        <Fragment key={index}>
          <div className='dark:text-white/30 text-black/70 py-2 px-3 h-11 rounded-md border dark:border-white/30 border-black/30 select-none pointer-events-none flex justify-between items-center w-full'>
            <div className='flex items-center gap-x-2'>
              <Image src={conv?.memberOne?.profile?.image} alt='' width={800} height={800} className='size-6 rounded-full border dark:border-white/30 border-black/30'/>
              <h1>{conv?.memberOne?.profile?.fullName}</h1>
            </div>
            <div className='text-sm'>
              {conv?.lastMessage}
            </div>
            <div className=''>
            <TimeAgo size={'14px'} timestamp={new Date(conv?.lastMessageCreatedAt)?.getTime()}/>
            </div>
          </div>
        </Fragment>
      ))}
      </div>
      {/* <div ref={observerRef} className="h-10">
        {isFetchingNextPage && <div>Yükleniyor...</div>}
        {!hasNextPage && isSuccess && <div>Tüm veriler yüklendi.</div>}
      </div> */}
    </div>
  )
}

export default ConversationDatas