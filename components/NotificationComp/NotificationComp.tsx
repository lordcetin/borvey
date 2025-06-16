/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useNotification from '@/store/useNotification'
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import TimeAgo from '../TimeAgo';
import useIsNotification from '@/store/useIsNotification';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

type Props = {}

const NotificationComp = (props: Props) => {
  const { openNotification,setOpenNotification } = useNotification()
  const { data:session } = useSession()
  const [ message,setMessage ] = useState([]);
  const { isNotification , setIsNotification } = useIsNotification()

  useLayoutEffect(() => {
    const getNotify = async () => {
      const { data } = await axios.get('/api/notification')
      setMessage(data)
    }
    getNotify()
  }, []);

  useLayoutEffect(() => {
    const getNotify = async () => {
      const { data } = await axios.get('/api/notification')
      setMessage(data)
    }
    getNotify()
  }, [openNotification]);

  return (
    <>
    {openNotification &&
      <motion.div
      initial={{ x: "100%", opacity: 0.3 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "-100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
      }}
      className='flex-col flex items-center w-[450px] max-md:w-85 h-[calc(100vh-300px)] absolute top-13 right-0 rounded-2xl border dark:border-white/30 border-black/30 dark:bg-[#13171b] bg-[#deebf8] z-[9999]'>
        <div className='flex justify-between items-center w-full self-start p-2'>
          <h1 className='ml-2'>Bildirimler</h1>
          <X size={22} onClick={() => {setOpenNotification(false),setIsNotification(false)}} className='cursor-pointer dark:text-white/50 text-black/50 dark:hover:text-white hover:text-black'/>
        </div>
        <div className='flex-col items-center w-full space-y-2 px-3 py-2'>
          {message?.reverse()?.filter((u:any) => u?.profileId === session?.user?.id)?.map((bildirim:any,index:any) => {
            const createdAt = new Date(bildirim?.createdAt)?.getTime()
            return (
              <Fragment key={index}>
                <div className='flex justify-between items-center w-full rounded-lg border dark:border-white/30 border-black/30 gap-x-2 p-1 cursor-pointer'>
                  <div className='flex items-center gap-x-2'>
                    <div className='flex items-center gap-x-2 px-2 py-1 max-md:px-1 w-27 max-md:w-23 truncate dark:bg-neutral-800 bg-neutral-200 border dark:border-white/10 border-black/30 rounded-md cursor-pointer whitespace-nowrap shrink-0'>
                      <Image src={bildirim?.senderImage} alt={bildirim?.senderName} width={800} height={800} className='object-cover size-5 rounded-full border dark:border-white/30 border-black/30'/>
                      <h1 className='dark:text-white/50 text-black/50 text-sm max-md:text-xs'>{bildirim?.senderName}</h1>
                    </div>
                    <h1 className='text-sm max-md:text-xs whitespace-nowrap first-letter:uppercase'>{bildirim?.text}</h1>
                  </div>
                  <div className='whitespace-nowrap mr-1'><TimeAgo timestamp={createdAt} size={'11px'}/></div>
                </div>
              </Fragment>
            )
          })}
        </div>
      </motion.div>
    }
    </>
  )
}

export default NotificationComp