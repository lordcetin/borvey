
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { Hash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react'

type Props = {
  type:"channel" | "conversation";
  name:any;
}

const ChatWelcome = ({type,name}: Props) => {
  const { data: session }:any = useSession()
  return (
    <div className='space-y-2 px-4 mb-4'>
      {type === 'channel' && (
        <div className='size-[75px] rounded-full bg-[#383A40] flex items-center justify-center'>
          <Hash size={28}/>
        </div>
      )}
      <p className='text-5xl font-bold dark:text-white text-black/50'>
        {type === 'channel' ? "Hoşgeldin #" : ""}{name}
      </p>
      <p className='text-neutral-400'>
        {type === 'channel'
        ? `Bu #${name} kanalının başlangıcıdır`
        : `Bu, ${name} ile olan konuşmanızın başlangıcıdır. ${session?.user?.firmStatus === false ? 'Firma ile görüştükten sonra "Teklifi Kabul Et" butonuna tıklayarak taşınma sürecinizi başlatan bir geri sayımı başlatmış olacaksınız.' : 'Kullanıcı, teklifinizi kabul ettiğinde, teklif verirken belirlediğiniz taşıma süresi kadar bir geri sayım başlayacaktır.'}`
        }
      </p>
    </div>
  )
}

export default ChatWelcome