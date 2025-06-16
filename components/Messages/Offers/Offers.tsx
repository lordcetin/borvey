/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Countdown from '@/components/Countdown/Countdown'
import Tippy from '@tippyjs/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'
import axios from 'axios'
import useComment from '@/store/useComment'
import { isEmpty } from 'lodash'
import { Check, ExternalLink, Landmark, Mail, Phone, Star, X } from 'lucide-react'

type Props = {
  offer:any;
  firm:any;
  comment:any;
}

const Offers = ({offer,firm,comment}: Props) => {
  const router = useRouter()
  const {data:session}:any = useSession()
  const now = Date.now()
  const { setCommentCreate } = useComment()

  const handleAccept = async (id:any) => {
    const formData = new FormData()
    formData.append("offerId",id)
    formData.append("status",'pending')
    const { status } = await axios.post('/api/offers/acceptOffer',formData)
    if(status === 200){
      return router.refresh()
    }
  }

  const handleDenied = async (id:any) => {
    const formData = new FormData();
    formData.append("offerId",id)
    const { status } = await axios.post('/api/offers/ignoreOffer',formData)
    if(status === 200){
      return router.refresh()
    }
  }

  const handleSuccess = async (id:any) => {
    const formData = new FormData()
    formData.append("offerId",id)
    formData.append("status",'success')
    const { status } = await axios.post('/api/offers/acceptOffer',formData)
    if(status === 200){
      return router.refresh()
    }
  }

  const formatted = (amount:any) => {
    const total = new Intl.NumberFormat("en-US",{
    notation: 'compact',
    compactDisplay: 'short'
  }).format(Number(amount))
  return total;
  }


  return (
    <div className='flex-col items-center w-full overflow-x-hidden overflow-y-auto space-y-2'>
    {offer?.filter((u:any) => u?.profileId === session?.user?.id || u?.offeredUserId === session?.user?.id)?.map((invData:any,index:any) => {

      const createdAtDate = invData?.createdAt
      ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(invData.createdAt))
      : null;

      const deliveryTime = invData?.time
      ? new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(Number(invData.time)))
      : null;

      return (
        <Fragment key={index}>
        <div className={`flex-col items-center w-full p-3 rounded-xl  ${invData?.status === 'success' ? " bg-emerald-950 hover:bg-emerald-900/50 border border-white/10" : "border dark:border-white/20 border-black/30 bg-brandark"} relative gap-x-2 overflow-x-hidden`}>
        <div onClick={() => router.push(`/panel/teklifler`)} className='absolute top-0 right-0 cursor-pointer dark:bg-white/60 bg-black/20 dark:hover:bg-white dark:text-black text-black/70 hover:text-black w-12 size-8 flex justify-center items-center rounded-se-xl rounded-es-xl hover:w-34 gap-x-1 hover:before:w-fit hover:before:whitespace-nowrap hover:before:text-black hover:before:content-["Teklife_Git"] transition-all font-semibold'><ExternalLink size={23} /></div>
        
        <div className='flex items-center w-full'>
          <Image onClick={() => router.push(`/panel/teklifler`)} src={invData?.profiles?.image} alt={invData?.profiles?.firmName} width={800} height={800} className='object-cover size-28 rounded-lg border dark:border-white/30 border-black/30 dark:hover:border-white/30 hover:border-black/20 cursor-pointer transition-all'/>
          <div className='flex items-center w-full'>
            <div className='flex-col items-center space-y-2 pl-3'>
            <div>
              <p className='text-sm dark:text-white/60 text-black/80'>Teklif Tarihi:</p>
              <p className='text-xs dark:text-white/30 text-black/60'>{createdAtDate}</p>
            </div>
            <div>
              <p className='text-sm dark:text-white/60 text-black/80'>{invData?.status === 'success' ? "Teslim Edilen Tarih:" : "Teslim Tarihi:"}</p>
              <p className='text-xs dark:text-white/30 text-black/60'>{deliveryTime}</p>
            </div>
            </div>
          </div>
        </div>

        <div className='flex-col items-center w-full space-y-1 mt-2'>
          <h1>{invData?.profiles?.firmName}</h1>
          {comment?.length > 0 &&
          <div className='flex items-center text-xs'>
            <h1 className="mr-1 dark:text-white/60 text-black/60">{firm?.stars}</h1>
            <div className='flex items-center gap-x-1'>
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Fragment key={index}>
                    <Star
                      className={
                        index < Math.round(Number(firm?.stars))
                          ? "text-amber-500"
                          : "text-white/30"
                      }
                    />
                  </Fragment>
                );
              })}
              <h1 className="ml-1 dark:text-white/60 text-black/60">{formatted(comment?.length)}</h1>
            </div>
          </div>}
          <h1 className='dark:text-white/60 text-sm flex items-center gap-x-1 text-black/60'><Mail size={16}/>{invData?.profiles?.email}</h1>
          <h1 className='dark:text-white/60 text-sm flex items-center gap-x-1 text-black/60'><Phone size={16}/>{invData?.profiles?.phone}</h1>
          <h1 className='dark:text-white/60 text-sm flex items-center gap-x-1 text-black/60'><Landmark size={16}/>{invData?.price}₺</h1>

          <div className='flex items-center w-fit text-xs mt-2'>
            {now > invData?.delivery ?
            <div className='bg-red-600/60 w-full flex justify-center items-center py-2 rounded-lg border border-white/20 px-3 cursor-default'>Reddedildi</div>
            : invData?.status === 'denied' ? 
            <div className='bg-red-600/60 w-full flex justify-center items-center py-2 rounded-lg border border-white/20 px-3 cursor-default'>Reddedildi</div>
            : invData?.status === 'success' ?
            <div className='flex justify-center items-center w-full gap-x-2'>
            <div className='bg-emerald-600 w-full flex justify-center items-center py-2 rounded-lg border border-white/20 px-3 cursor-default'>Tamamlandı</div>
            {!isEmpty(comment?.filter((u:any) => u?.receiverId === session?.user?.id || u?.senderId === session?.user?.id)) ? null : <div onClick={() => setCommentCreate(true)} className={session?.user?.firmStatus === false ? 'bg-amber-600 hover:bg-amber-700 transition-all w-full flex justify-center items-center py-2 rounded-lg border border-white/20 px-3 cursor-pointer whitespace-nowrap gap-x-2': "hidden"}><Star/> Yorum Yap</div>}
            </div>
            : invData?.status === 'no' ?
            <>
            {session?.user?.firmStatus === false ? 
            <div className="flex items-center gap-x-2">
              <Tippy content={"Taşıma Süresi Başlayacaktır"}>
                <button onClick={() => handleAccept(invData?.id)} type='button' className='w-full px-2 py-2 whitespace-nowrap text-sm font-bold bg-teal-500 hover:bg-teal-600 transition-all cursor-pointer rounded-md flex justify-center items-center gap-x-2'><Check size={20}/> Teklifi Kabul Et</button>
              </Tippy>
              <button onClick={() => handleDenied(invData?.id)} type='button' className='w-full px-2 py-2 whitespace-nowrap text-sm font-bold bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-md flex justify-center items-center gap-x-2'><X size={22}/> Teklifi Reddet</button>
            </div> 
            : <div>Teklif İnceleniyor</div>
            } 
            </>
            : invData?.status === 'pending' ? <Countdown timestamp={Number(invData?.time)}/> : null
            }
          </div>
          {invData?.status === 'pending' && session?.user?.firmStatus === false &&  <Tippy content={"Taşıma işleminiz bittiyse tıklayın"}><button onClick={() => handleSuccess(invData?.id)} type='button' className='w-full px-2 py-2 whitespace-nowrap text-sm font-bold bg-teal-500 hover:bg-teal-600 transition-all cursor-pointer rounded-md flex justify-center items-center gap-x-2 mt-2'><Check size={20}/> İlanı Tamamla</button></Tippy>}
        </div>

      </div>
      </Fragment>
      )
    })

    }
    </div>
  )
}

export default Offers