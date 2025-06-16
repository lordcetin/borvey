/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'

type Props = {
  otherMembers:any;
}

const MeNavbar = ({otherMembers}: Props) => {

  
  return (
  <div className='h-[48px] w-full flex justify-between items-center border-b border-[#1F2124] self-start dark:bg-[#0a0d11] bg-white px-3 text-neutral-300'>


  </div> 
  )
}

export default MeNavbar