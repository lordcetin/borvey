/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import { MessageSquareOff } from 'lucide-react';
const DATE_FORMAT = 'd.MM.yyyy HH:mm';
type Props = {
  params:any
}

const MessagesPage = async ({params}: Props) => {
  const session:any = await auth()

  const currentMember = await prismadb.member.findFirst({
    where:{
      profileId:session?.user?.id
    },
    include:{
      profile:true
    }
  })

  // const conversations = await prismadb.conversation.findMany()
  // console.log("conversations",conversations)

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
      }
    }
  })


  const url:any = `/panel/mesajlar/${conversations[conversations?.length - 1]?.id}`
  if(!conversations?.length) {
    return (
    <div className='flex justify-center items-center w-full h-[calc(100vh-250px)]'>
      <div className='flex-col flex justify-center items-center w-full space-y-4'>
        <MessageSquareOff size={150} className='dark:text-neutral-700 text-black/70'/>
        <h1 className='dark:text-neutral-700 text-black/70 text-xl font-semibold'>Henüz hiç mesaj yok.</h1>
        <Link title='Teklifler' href={'/panel/teklifler'} className='rounded-full dark:bg-white/50 bg-black/50 dark:text-black text-white dark:hover:bg-white hover:bg-black px-8 py-2 font-semibold transition-all'>Teklifleri Gör</Link>
      </div>
    </div>
    )
  }else{
    return (
      redirect(url)
    )
  }
}

export default MessagesPage