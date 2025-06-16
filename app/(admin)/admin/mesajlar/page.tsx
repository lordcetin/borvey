/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import prismadb from '@/lib/prismadb';
import { DataTableMessage } from '@/components/DataTable/DataTableMessage';
import { redirect } from 'next/navigation';
import { isEmpty } from 'lodash';
import { auth } from '@/auth';

type Props = {}

const Mesajlar = async (props: Props) => {
  const session:any = await auth()
  const conversation:any = await prismadb.conversation.findMany({
    include:{
      memberOne:{
        include:{
          profile:{
            include:{
              offers:true,
              gigs:true
            }
          }
        }
      },
      memberTwo:{
        include:{
          profile:{
            include:{
              offers:true,
              gigs:true
            }
          }
        }
      },
    }
  })


  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
    <div className='flex justify-center items-center w-full px-10 mt-5'>       
      <DataTableMessage data={conversation}/>
    </div>
  )
}
}

export default Mesajlar