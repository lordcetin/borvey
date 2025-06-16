/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import {
Popover,
PopoverContent,
PopoverTrigger
} from '@/components/ui/popover' 
import { useTheme } from 'next-themes'
import { Smile } from 'lucide-react'

type Props = {
  onChange: (value:string) => void;
}

const EmojiPicker = ({onChange}: Props) => {
  const {resolvedTheme} = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile size={24} className='dark:text-[#B5BAC1] text-[#7e858d] cursor-pointer dark:hover:text-white hover:text-black transition-all'/>
      </PopoverTrigger>
      <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-[68px]'>
        <Picker data={data} onEmojiSelect={(emoji:any) => onChange(emoji.native)} theme={resolvedTheme} />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker