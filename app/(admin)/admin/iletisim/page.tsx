/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react'
import prismadb from '@/lib/prismadb'
import { DataTableContact } from '@/components/DataTable/DataTableContact'
import { auth } from '@/auth'
import { isEmpty } from 'lodash'
import { redirect } from 'next/navigation'

type Props = {}

const ContactAdmin = async (props: Props) => {
  const session:any = await auth()
  const contact:any = await prismadb.contact.findMany()
  console.log("contact",contact)

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
    <div className='flex justify-center items-center w-full container mx-auto'>
      <DataTableContact data={contact}/>
    </div>
  )
}
}

export default ContactAdmin