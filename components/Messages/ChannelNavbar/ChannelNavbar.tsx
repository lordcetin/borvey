/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import prismadb from '@/lib/prismadb'
import { useParams } from 'next/navigation'
import MeNavbar from '../MeNavbar/MeNavbar'

type Props = {
  otherMembers:any;
}

const ChannelNavbar = ({otherMembers}: Props) => {
  
  return (
    <>

    <MeNavbar otherMembers={otherMembers}/>

  </>
  )
}

export default ChannelNavbar