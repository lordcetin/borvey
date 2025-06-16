/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { auth } from '@/auth';
import { isEmpty } from 'lodash';
import GigClient from '@/components/Gig/GigClient/GigClient';
import { redirect } from 'next/navigation';

type Props = {}

const Ilanlar = async (props: Props) => {
  const session:any = await auth()

  if(isEmpty(session)){
    return redirect('/')
  }else{
  return (
    <div className='w-full flex-col flex items-center outline-none relative'>
      <GigClient/>
    </div>
  )
}
}

export default Ilanlar