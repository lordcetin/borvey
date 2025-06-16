/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTableGig } from '@/components/DataTable/DataTableGig'
import React from 'react'
import prismadb from '@/lib/prismadb'
import { isEmpty } from 'lodash'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

type Props = {}

const Gig = async (props: Props) => {
  const session:any = await auth()
  const gig:any = await prismadb.gig.findMany({
    include:{
      profiles:true,
      offers:{
        include:{
          profiles:true
        }
      }
    }
  })

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
    <div className='flex justify-center items-center w-full px-10 mt-5'>       
      <DataTableGig data={gig}/>
    </div>
  )
}
}
export default Gig