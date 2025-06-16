/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { LogIn, Moon, Sun } from 'lucide-react'
type Props = {}

const MobileMenu = (props: Props) => {
  const {theme, setTheme , resolvedTheme} = useTheme();
  return (
    <motion.div 
    initial={{ y: "-20%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1],
    }}
    className='absolute top-10 right-0 dark:bg-[#0a0d11] bg-white backdrop:blur-md h-fit p-3 rounded-md flex justify-center items-center border dark:border-white/20 border-black/30'>
      <div className='flex-col items-center space-y-2'>
        <Link title='Hizmet Al' href={`/hizmet-al`} className="block border dark:border-white/20 whitespace-nowrap border-black/20 px-5 py-2 rounded-full text-md bg-blue-500 hover:bg-blue-700 transition-all font-semibold text-white text-center">Hizmet Al</Link>
        <Link title='Hizmet Ver' href={`/hizmet-ver`} className="block border dark:border-white/20 border-black/20 whitespace-nowrap px-5 py-2 rounded-full text-md bg-amber-500 hover:bg-amber-600 transition-all font-semibold text-white text-center">Hizmet Ver</Link>
        <Link title='Giriş Yap' href={`/giris-yap`} className={`flex border dark:border-white/20 border-black/20 px-5 py-2 whitespace-nowrap rounded-full bg-black text-white dark:bg-white dark:text-black text-md transition-all text-center items-center gap-x-2`}><LogIn size={23}/> Giriş Yap</Link>
        <div onClick={() => setTheme(resolvedTheme === 'dark' ? "light" : "dark")} className={`flex items-center w-fit px-5 py-2 gap-x-2 text-center rounded-full ${resolvedTheme === 'dark' ? "bg-white text-black" : "bg-black text-white"}`}>
          {resolvedTheme === 'dark' ? <Sun />
          : <Moon />}
          <h1 className='whitespace-nowrap'>{resolvedTheme === 'dark' ? "Açık Tema" : "Koyu Tema"}</h1>
        </div>
      </div>
    </motion.div>
  )
}

export default MobileMenu