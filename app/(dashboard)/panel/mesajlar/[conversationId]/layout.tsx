
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { auth } from '@/auth'
import Messages from '@/components/Messages/Message/Messages';
import React, { Fragment, Suspense } from 'react'
import prismadb from '@/lib/prismadb'
import { format } from 'date-fns';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import Offers from '@/components/Messages/Offers/Offers';
import PreLoading from '@/components/PreLoading/PreLoading';
import CommentCreate from '@/components/CommentCreate/CommentCreate';
import ChatNavbar from '@/components/Messages/ChatNavbar/ChatNavbar';
import axios from 'axios';
// import Invoices from '@/components/Messages/Invoices/Invoices';
const DATE_FORMAT = 'd.MM.yyyy HH:mm';

const MessageLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) => {

  const conversationId = await params?.conversationId

  const session:any = await auth()
  const userId:any = session?.user?.id

  const convOther = await prismadb.conversation.findUnique({
    where:{
      id: conversationId
    },
    include:{
      memberTwo:{
        include:{
          profile:true,
        }
      },
      memberOne:{
        include:{
          profile:true
        }
      },
    }
  })

  const memberTwoId = convOther?.memberTwoId

  const currentMember:any = await prismadb.member.findFirst({
    where:{
      profileId:userId
    },
    include:{
      profile:true,
    },
  })

  const otherMember:any = await prismadb.member.findFirst({
    where:{
      id:memberTwoId
    },
    include:{
      profile:true,
    },
  })

  // const conversation = await getOrCreateConversation(currentMember?.id,otherMember?.id)

  const otherMembers =  
  convOther?.memberTwo?.profileId === session?.user?.id 
  ? convOther?.memberOne 
  : convOther?.memberTwo 

  const conversations:any = await prismadb.conversation.findMany({
    where:{
      OR:[
        {memberOneId:currentMember?.id},
        {memberTwoId:currentMember?.id}
      ]
    },
    include:{
      memberOne:{
        include:{
          profile:true
        }
      },
      memberTwo:{
        include:{
          profile:true
        }
      },
      directMessages:true
    }
  })

  const offer = await prismadb.offers.findMany({
    where:{
      AND:[
        {offeredUserId: convOther?.memberOne?.profileId},
        {profileId: convOther?.memberTwo?.profileId},
      ]
    },
    include:{
      gig:{
        include:{
          offers:true
        }
      },
      profiles:{
        include:{
          offers:true
        }
      }
    }
  });

  const user = await prismadb.user.findUnique({
    where:{
      id:convOther?.memberTwo?.profileId
    },
    include:{
      firm:true,
    }
  })

  const comment = await prismadb.comments?.findMany({
    where:{
      profileId:user?.firm?.[0]?.id
    }
  })

  const firm = user?.firm

  return (
    <>
    <ChatNavbar conversations={conversations} conversationId={conversationId} offer={offer} firm={firm?.[0]} comment={comment}/>
    <div className='flex w-full outline-none'>

      <main className='flex-col items-center w-full dark:bg-[#0a0d11] bg-white border-t dark:border-white/20 border-black/30 relative'>
      <CommentCreate
      offers={offer}
      />
      <div className='w-62 h-[28px] flex items-center dark:bg-[#161a20] bg-neutral-200 rounded-sm px-2 absolute -top-12 ml-4 max-md:hidden border dark:border-white/20 border-black/30'>
        <input type="text" className='bg-transparent outline-none w-full placeholder:text-neutral-500 text-sm' placeholder='Kullanıcı Ara' />
        <svg className="icon_effbe2 visible_effbe2 cursor-pointer" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clipRule="evenodd" className=""></path></svg>
      </div>
        {/* <ChannelNavbar otherMembers={otherMembers} /> */}

        <div className='flex justify-between items-center w-full'>
        <div className={`h-[calc(100vh-123px)] overflow-y-auto border-r dark:border-white/20 border-black/30 w-[450px] max-md:hidden `}>
        {conversations?.reverse()?.map(async(item:any,index:any) => {
          const directM:any = await prismadb.directMessage.findMany({
            where:{
              conversationId:item?.id
            }
          })
          const timestamp = isEmpty(directM[directM?.length - 1]?.createdAt) ? new Date() : directM[directM?.length - 1]?.createdAt
          return (
            <Fragment key={index}>
              <div className={`flex justify-between items-center w-full overflow-x-hidden overflow-y-auto group transition-all dark:hover:bg-[#1d222b] hover:bg-[#dee3eb] p-3 cursor-pointer gap-x-4 nth-3:border-b nth-[3n+1]:border-b dark:border-white/20 border-black/30 ${conversationId === item?.id && "dark:bg-[#161a20] bg-[#dee3eb]"}`}>
                <div className="w-9 whitespace-nowrap shrink-0 relative">
                  <Link title='Mesajlar' href={`/panel/mesajlar/${item?.id}`}><Image src={item?.memberTwo?.profile?.image} width={800} height={800} alt={item?.memberTwo?.profile?.fullName} className='size-9 rounded-full object-cover opacity-80 group-hover:opacity-100'/></Link>
                  <span className='size-3 rounded-full absolute right-0 bottom-0 bg-green-500'></span>
                </div>
                <div className='flex-col items-center gap-x-2 w-[300px]'>
                  <Link title='Mesajar' href={`/panel/mesajlar/${item?.id}`} className='dark:text-white/80 text-black/60 dark:group-hover:text-white group-hover:text-black transition-all truncate font-semibold'>{item?.memberTwo?.profile?.fullName}</Link>
                  <div className='truncate text-xs dark:text-white/50 text-black/50 dark:group-hover:text-white/70 group-hover:text-black'>{directM[directM?.length - 1]?.content}</div>
                </div>
                <div className='text-[11px] dark:text-white/20 text-black/70 dark:group-hover:text-white/50 group-hover:text-black/50 whitespace-nowrap box-content'>{format(new Date(timestamp), DATE_FORMAT)}</div>
              </div>
            </Fragment>
          )
        })}
        </div>

          
        <Messages currentMember={currentMember} otherMember={otherMember} conversation={convOther} /> 

        <div className='h-[calc(100vh-123px)] p-3 overflow-y-auto border-l dark:border-white/20 border-black/30 w-[550px] max-md:hidden'>
          <Offers offer={offer} firm={firm?.[0]} comment={comment}/>
        </div>

        </div>

      {children}
      
      </main>
      
    </div>

    </>
  )
}

export default MessageLayout