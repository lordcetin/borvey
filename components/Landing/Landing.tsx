/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {}

const Landing = (props: Props) => {
  return (
    <div className='flex max-md:flex-col justify-center items-center w-full py-20 max-md:py-16 max-md:px-3 px-8 mt-10 container mx-auto'>
      <motion.div
      initial={{ x: "-100%", opacity: 0.3 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
      }}
      >
        <p className='text-7xl max-md:text-6px dark:text-white/80 text-black/70'>borvey</p>
        <p className='text-6xl max-md:text-5px dark:text-white/80 mt-2 text-black/70'>ile taşınmak <strong className='dark:text-white text-black'>hesaplı</strong></p>
        <p className='text-7xl max-md:text-6px dark:text-white/80 text-black/70'>ve <strong className='dark:text-white text-black'>kolay!</strong></p>
        <p className='w-[500px] max-md:w-full text-md mt-5 dark:text-white/50 text-black/70'>Güvenilir bir nakliyeci bulmanın pizza siparişi vermek kadar kolay olduğu bir dünyayı hayal edin...</p>
        <div className='flex items-center gap-x-2 mt-10'>
          <Link title='Hizmet Al' href={'/hizmet-al'} className='rounded-full bg-blue-600 px-5 py-2 text-white border dark:border-white/20 border-black/50 cursor-pointer hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-blue-500'>Nakliyeci Ara</Link>
          <Link title='Hizmet Ver' href={'/hizmet-ver'} className='rounded-full bg-amber-600 px-5 py-2 text-amber-950 border dark:border-white/20 border-black/50 cursor-pointer hover:-translate-y-1 transition-all hover:shadow-2xl hover:shadow-amber-500'>Aracına Yük Bul</Link>
        </div>
      </motion.div>
      {/* <motion.div
      initial={{ x: "100%", opacity: 0.3 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "-100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
      }} 
      className='relative left-20 top-16 max-md:left-0'>
        <Image src={'/assets/home-img.png'} width={800} height={800} alt='Home' className='object-cover size-[500px] max-md:size-96' priority quality={75}/>
      </motion.div> */}
      <div
      className='relative left-20 top-16 max-md:left-0'>
        <Image src={'/assets/home-img.png'} width={800} height={800} alt='Home' className='object-cover size-[500px] max-md:size-96' priority quality={75}/>
      </div>
    </div>
  )
}

export default Landing