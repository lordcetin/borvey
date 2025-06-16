/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useChatQuery } from '@/hook/useChatQuery'
import { useChatSocket } from '@/hook/useChatSocket'
import { useSession } from 'next-auth/react'
import React, { Fragment } from 'react'
import OfferComp from '../Gig/OfferComp/OfferComp'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import { LightbulbOff } from 'lucide-react'

type Props = {}

const OfferClient = (props: Props) => {
  const {data:session} = useSession()
  const addKey = `ilan:${session?.user?.id}`
  const queryKey = `ilan:${session?.user?.id}:offers`;
  const updateKey = `ilan:${session?.user?.id}:offers:update`
  const apiUrl = "/api/offers/getOffers"

  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}:any = useChatQuery({
    queryKey,
    apiUrl,
    paramKey:"",
    paramValue:""
  })
  useChatSocket({queryKey,addKey,updateKey})

  return (
    <div className='flex-col items-center w-full space-y-3 relative'>
    {isEmpty(data?.pages[0]) &&
    <div className='flex justify-center items-center w-full h-[calc(100vh-250px)]'>
      <div className='flex-col flex justify-center items-center w-full space-y-4'>
        <LightbulbOff size={150} className='dark:text-white/30 text-black/70'/>
        <h1 className='dark:text-white/30 text-black/70 text-xl font-semibold'>Henüz hiç teklif yok.</h1>
        <Link title='İlanlar' href={'/panel/ilanlar'} className='rounded-full dark:bg-white/50 bg-black/50 dark:text-black text-white dark:hover:bg-white hover:bg-black px-8 py-2 font-semibold transition-all'>İlanlarını Gör</Link>
      </div>
    </div>
    }
    <div className='overflow-x-hidden overflow-y-auto px-5 pb-5 space-y-3 h-[calc(100vh-120px)] max-md:h-[calc(100vh-150px)]'>
    {data?.pages?.map((group:any,i:any) => {
      return (
        <Fragment key={i}>
          {group?.reverse()?.map((teklif:any,index:any) => {

            return (
              <Fragment key={index}>
                <OfferComp teklif={teklif} index={index} />
              </Fragment>
            )
          })}
        </Fragment>
        
      )
    })}
    </div>
    </div>
  )
}

export default OfferClient