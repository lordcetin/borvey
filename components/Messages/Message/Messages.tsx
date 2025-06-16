/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useSession } from 'next-auth/react';
import Input from '../Input/Input';
import ChannelChatMessages from '../ChannelChatMessages/ChannelChatMessages';

type Props = {
  currentMember:any;
  otherMember:any;
  conversation:any;
}

const Messages = ({currentMember,otherMember,conversation}: Props) => {
  const { data: session } = useSession()

  const username = otherMember?.profile?.id === session?.user?.id ? conversation?.memberOne?.profile?.fullName : conversation?.memberTwo?.profile?.fullName

  return (
    <div className='w-full flex-col'>
      
      <div className='flex-col items-center relative w-full'>
        <>
        <ChannelChatMessages 
        member={currentMember} 
        name={username}
        chatId={conversation?.id}
        type="conversation"
        apiUrl="/api/directmessages"
        paramKey="conversationId"
        paramValue={conversation?.id}
        socketUrl="/api/socket/directmessages"
        socketQuery={{
          userId:session?.user?.id as string,
          conversationId:conversation?.id as string
        }}
        />
        <Input
        name={username}
        type="conversation"
        apiUrl="/api/socket/directmessages"
        query={{
          userId:session?.user?.id as string,
          conversationId:conversation?.id as string
        }}
        />
        </>
        
      </div>
    </div>
  )
}

export default Messages