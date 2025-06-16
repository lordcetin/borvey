/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ChevronDown, CircleHelp, Grid2x2Plus, LayoutGrid, LogOut, MessageSquare, Moon, Settings, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { isEmpty } from 'lodash'

type Props = {}

const SessionModal = (props: Props) => {
  const { data:session }:any = useSession()
  const image = session?.user?.image
  const [ openModal, setOpenModal ] = useState(false);
  const { setTheme,theme } = useTheme()
  const pathname = usePathname()

  return (
    <div className='flex items-center w-fit relative'>
      <div onClick={() => setOpenModal(!openModal)} className={`${openModal ? "border dark:border-white border-black" : ""} flex items-center w-fit rounded-full border dark:border-white/20 border-black/20 p-1 gap-x-3 max-md:gap-x-2 cursor-pointer hover:dark:border-white/30 hover:border-black/30 group/item transition-all relative`}>
        {image ? <Image src={image} alt={session?.user?.fullName} width={800} height={800} className='object-cover size-9 max-md:size-7 rounded-full cursor-pointer border dark:border-white/30 border-black/60'/> : <div className='size-9 rounded-full dark:bg-neutral-800 bg-blue-100 animate-pulse cursor-pointer'></div>}
        <h1 className='dark:text-white/50 group-hover/item:dark:text-white text-black/50 group-hover/item:text-black transition-all max-md:text-xs'>{session?.user?.firmStatus ? session?.user?.firmName : session?.user?.fullName}</h1>
        <ChevronDown size={28} className={`${openModal ? "rotate-180" : "rotate-0"} mr-1 dark:text-white/50 group-hover/item:dark:text-white text-black/50 group-hover/item:text-black transition-all`}/>
      </div>
      {openModal &&
      <motion.div
      initial={{ y: "-10%", opacity: 0.3 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
      }}
      className='w-full flex-col items-center absolute top-13 border dark:border-white/20 border-black/20 rounded-xl overflow-hidden z-[9999] dark:bg-[#13161b] bg-white'>
        {pathname === '/' && !isEmpty(session) &&
        <>
        <Link title='Teklifler' href={'/panel/teklifler'} className=' flex items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2'><LayoutGrid /> Teklifler</Link>
        <Link title='İlanlar' href={'/panel/ilanlar'} className=' flex items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2'><Grid2x2Plus /> İlanlar</Link>
        <Link title='Mesajlar' href={'/panel/mesajlar'} className=' flex items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2'><MessageSquare /> Mesajlar</Link>
        <div className='w-full h-[1px] dark:bg-white/20 bg-black/30 flex '></div>
        </>
        }
        <Link title='Teklifler' href={'/panel/teklifler'} className='items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 hidden max-md:flex'><LayoutGrid /> Teklifler</Link>
        <Link title='İlanlar' href={'/panel/ilanlar'} className='items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 hidden max-md:flex'><Grid2x2Plus /> İlanlar</Link>
        <Link title='Mesajlar' href={'/panel/mesajlar'} className='items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 hidden max-md:flex'><MessageSquare /> Mesajlar</Link>
        <div className='w-full h-[1px] dark:bg-white/20 bg-black/30 hidden max-md:flex'></div>
        <div onClick={() => setTheme(`${theme === 'light' ? "dark" : "light"}`)} className=' items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 hidden max-md:flex'>
            {theme === 'light' ? <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            : <Moon className="h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
            <h1>{theme === 'light' ? "Açık" : "Koyu"}</h1>
        </div>
        <Link title='Ayarlar' href={'/panel/ayarlar'} className='flex items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2'><Settings /> Ayarlar</Link>
        <Link title='Yardım' href={`/yardim`} className='items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 hidden max-md:flex'><CircleHelp /> Yardım</Link>
        <div onClick={() => signOut({redirectTo:`/giris-yap`})} className='flex items-center gap-x-4 dark:hover:bg-neutral-800 hover:bg-blue-100 cursor-pointer px-5 py-2 whitespace-nowrap'><LogOut /> Çıkış Yap</div>
      </motion.div>
      }
    </div>
  )
}

export default SessionModal