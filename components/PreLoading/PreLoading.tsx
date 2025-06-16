/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import {motion} from 'framer-motion';
import Image from 'next/image';
import { useProgress } from '@/hook/useHook';
import Logo from '../Logo/page';
type Props = {}

const PreLoading = (props: Props) => {
  const progress = useProgress();
  return (
    <div className="">
    <div className="fixed top-0 left-0 z-[9999999] bg-zinc-950 w-full h-full flex justify-center items-center">
    <div className="flex justify-center items-center w-full text-center">
    <div className="flex-col justify-center items-center text-center">
    {/*<Image src={logo} width={100} height={80} alt="Cosmeta" className="justify-center items-center flex w-full relative top-24" />*/}
    <motion.div
    initial={{scale:0.5}}
    transition={{ duration:1, ease:'easeInOut'}}
    animate={{scale:1}}
    >
    <Logo/>

    <div
    className="h-1 bg-gradient-to-l to-blue-600 to-95% from-sky-300 from-5% transition-all duration-200 ease-out mt-5 rounded-full"
    style={{ width: `${progress}%` }}
    >
    <span className={`w-full justify-end flex self-end relative bottom-[7px] left-8 text-xs text-white/${(progress + 20)}`}>{progress}%</span>
    </div>
    
    </motion.div>
{/*      <div className="w-12 h-12 border-t-2 border-b-0 border-l-0 border-r-0 border-purple-500 rounded-full shadow-xl shadow-purple-400 animate-spin">
        &nbsp;
      </div>*/}
    </div>
    </div>
    </div>
    </div>
  )
}

export default PreLoading