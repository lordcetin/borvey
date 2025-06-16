/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import SettingClient from '@/components/SettingClient/SettingClient'
import React from 'react'
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';
import { isEmpty } from 'lodash';
import { redirect } from 'next/navigation';

type Props = {}

const Settings = async (props: Props) => {
  const session = await auth()

  const user = await prismadb.user.findUnique({
    where:{
      id:session?.user?.id
    }
  })

  if(isEmpty(session)){
    return redirect('/')
  }else{
  return (
    <>
      <SettingClient user={user}/>
    </>
  )
}
}

export default Settings