/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import TotalUsers from '../_components/TotalUsers'
import GigDatas from '../_components/GigDatas'
import OfferDatas from '../_components/OfferDatas'
import prismadb from '@/lib/prismadb';
import ConversationDatas from '@/components/ConversationDatas/ConversationDatas';

type Props = {}

const AdminPanel = async (props: Props) => {

  const user = await prismadb?.user?.findMany()
  const offer = await prismadb?.offers?.findMany()
  const gig = await prismadb?.gig?.findMany()
  const conversation = await prismadb?.conversation?.findMany({
    include:{
      directMessages:true,
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
    }
  })

  return (
    <>
        <div className='flex-col flex items-center space-y-6'>
          <div className='w-full flex items-center gap-x-6'>
            <div className='rounded-2xl box-border w-[600px] h-[600px] self-start space-y-6'>
              <TotalUsers user={user}/>
              <div className='w-full h-[288px] rounded-2xl box-border self-start flex gap-x-6'>
                <OfferDatas offer={offer}/>
                <GigDatas gig={gig}/>
              </div>
            </div>
            <div className='rounded-2xl border dark:border-white/10 border-black/10 box-border w-[400px] h-[600px]'>
              <ConversationDatas conversation={conversation}/>
            </div>
          </div>


        </div>
    </>
  )
}

export default AdminPanel