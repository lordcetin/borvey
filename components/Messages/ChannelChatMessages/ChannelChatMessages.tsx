/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { Member, Message,User } from '@prisma/client';
import React, { Fragment, useRef, useState } from 'react'
import { useChatQuery } from '@/hook/useChatQuery';
import { format } from 'date-fns';
import { useChatSocket } from '@/hook/useChatSocket';
import { useChatScroll } from '@/hook/useChatScroll';
import ChatIem from '../ChatItem/ChatItem';
import ChatWelcome from '../ChatWelcome/ChatWelcome';
import { Info, LoaderCircle, LucideLoader2, ServerOff, X } from 'lucide-react';
import { isEmpty } from 'lodash';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

const DATE_FORMAT = 'd.MM.yyyy HH:mm';

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: User
  }
  inspect:any
}

type Props = {
  name:string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChannelChatMessages = ({name,member,chatId,apiUrl,socketQuery,socketUrl,paramKey,paramValue,type}: Props) => {
  const addKey = `chat:${chatId}`
  const queryKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`
  const { data:session }:any = useSession()
  
  const chatRef:any = useRef(null);
  const bottomRef:any = useRef(null);

  const [current,setCurrent] = useState(0);
  const [hide,setHide] = useState(false);
  
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}:any = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
  })
  
  useChatSocket({queryKey,addKey,updateKey})
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if(status === "loading"){
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <LoaderCircle size={28} className='animate-spin mb-2'/>
        <p className="text-xs text-neutral-400">Mesajlar Yükleniyor...</p>
      </div>
    )
  }

  if(status === "error"){
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <ServerOff size={28} className='mb-2'/>
        <p className="text-xs text-neutral-400">Bir şeyler yolunda gitmedi!</p>
      </div>
    )
  }


  return (

    <div ref={chatRef} className='w-full justify-center flex-col items-center h-[calc(100vh-123px)] p-3 overflow-y-auto'>
      {!hasNextPage && <div className='flex-1'/> }
      {!hasNextPage && <ChatWelcome type={type} name={name}/>}
      {hasNextPage && (
        <div className='flexx justify-center w-full items-center'>
          {isFetchingNextPage ? (
            <LucideLoader2 className='animate-spin size-6 text-neutral-600 my-4 flex justify-center items-center w-full'/>
          ): (<button onClick={() => fetchNextPage()} className='text-neutral-400 hover:text-white transition-all flex justify-center items-center w-full my-4 cursor-pointer dark:bg-neutral-800/50 dark:hover:bg-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md py-1 text-sm'>Önceki Mesajları Gör</button>)}
        </div>
      )}
      <div className='flex flex-col-reverse mt-auto gap-y-4'>
        {isEmpty(data?.pages?.[0]) && current !== 4 && session?.user?.firmSatus === false &&
        <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`w-3/6 ${hide && "hidden"} rounded-3xl border dark:border-white/15 border-black/20 dark:bg-brandDark bg-neutral-200 z-[99999] absolute top-54 right-5 before:contents-[" "] before:absolute before:-right-[13px] before:top-11 dark:before:bg-brandDark before:bg-neutral-200 before:size-6 before:rounded-se-md dark:before:border-r dark:before:border-t dark:before:border-white/30 before:border-black/30 before:rotate-45 before:z-0`}
        >
          <div className='flex items-center justify-between w-full py-2 px-3'>
            <h1 className='flex items-center gap-x-2 dark:text-white/30 text-black/70'><Info /> Bilgilendirme</h1>
            <X onClick={() => setHide(true)} size={23} className='cursor-pointer dark:text-white/30 text-black/70 dark:hover:text-white hover:text-black'/>
          </div>
          <div className='flex-col items-center w-full pb-5 px-5 dark:text-white/50 text-black/50'>
            <p>{current === 0 ? "Nakliyeci ile çalışmaya karar verdiğinizde teklifi kabul et butonuna tıklayın." : current === 1 ? "Nakliyeci için bir geri sayım sayacı başlayacaktır." : current === 2 ? "Taşıma süreciniz tamamlandığında ilanı tamamla butonuna tıklayın." : "Taşıma sürecinizin tamamlandığını belirtmediğinizde ilanınız otomatik olarak onaylanacaktır."}</p>
          <div className='flex items-center justify-between w-full mt-3'>
            {current > 0 ? <button onClick={() => setCurrent((prev:any) => prev - 1)} type='button' className='px-3 py-1 rounded-md dark:bg-white dark:text-black bg-black text-white font-bold dark:hover:bg-white/50 hover:bg-black/50 cursor-pointer'>Geri</button> : <div></div>}
            <button onClick={() => setCurrent((prev:any) => prev + 1)} type='button' className='px-3 py-1 rounded-md dark:bg-white dark:text-black bg-black text-white font-bold dark:hover:bg-white/50 hover:bg-black/50 cursor-pointer'>İleri</button>
          </div>
          </div>
        </motion.div>
        }
        {data?.pages?.map((group:any,i:any) => {
          return (
            <Fragment key={i}>
              {group?.items?.map((message:MessageWithMemberWithProfile) => {

                return (
                  <Fragment key={message?.id}>
                    <ChatIem
                    currentMember={member}
                    id={message?.id}
                    content={message?.content}
                    inspect={message?.inspect}
                    member={message?.member as any}
                    timestamp={format(new Date(message?.createdAt), DATE_FORMAT)}
                    isUpdated={message?.updatedAt !== message.createdAt}
                    fileUrl={message?.fileUrl}
                    deleted={message.deleted}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    />
                  </Fragment>
                )
              })}
            </Fragment>
          )
        })}
      </div>

      <div ref={bottomRef}></div>
    </div>

  )
}

export default ChannelChatMessages