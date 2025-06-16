/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DataTableDemo } from '@/components/DataTable/DataTable'
import React from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth'
import { isEmpty } from 'lodash'
import { redirect } from 'next/navigation'

type Props = {}

const Users = async (props: Props) => {
  const session:any = await auth()
  
  const users:any = await prismadb.user?.findMany({
    include:{
      firm:true
    }
  })

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
    return (
    <div className='flex justify-center items-center w-full px-10 mt-5'>       
      <DataTableDemo data={users}/>
    </div>
    )
}
}

export default Users