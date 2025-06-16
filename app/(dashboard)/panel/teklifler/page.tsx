/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { auth } from '@/auth'
import React, { Fragment } from 'react'
import { isEmpty } from 'lodash';
import OfferClient from '@/components/OfferClient/OfferClient';
import { redirect } from 'next/navigation';

type Props = {}

const Teklifler = async (props: Props) => {
  const session:any = await auth()

  if(isEmpty(session)){
    return redirect('/')
  }else{
  return (
    <div className='w-full flex-col flex items-center outline-none'>
      <OfferClient/>
    </div>
  )
}
}
export default Teklifler