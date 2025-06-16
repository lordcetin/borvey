/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ChevronRight } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { Fragment } from 'react'

type Props = {}

const TransportRequest = (props: Props) => {

  const content = [
    {
      id:1,
      title:"Kocaeli-Evden Eve Nakliye",
      category:"Kısa Mesafeli Nakliye",
      description:"Tek katlı müstakil evden 1.kata taşınma. Birçok eşyamızı kendimiz kolilileyeceğiz. Beyaz eşyaların korunmasını, masa, yatak tarzı eşyaların titiz taşınmasını istiyoruz.",
      image:"/assets/evden-eve.jpg"
    },
    {
      id:2,
      title:"İstanbul içi 10 parça eşya taşınacak",
      category:"Evden Eve Nakliye",
      description:"Tv ünitesi, yemek masası, buzdolabı, çamaşır makinası, 4 dolap bazasız yatak, 5.kat asansörsüz evden 5.kat asansörlü binaya taşınacak.",
      image:"/assets/ofis-tasima.jpg"
    },
    {
      id:3,
      title:"İstanbul'dan Ankara'ya ev taşınacak",
      category:"Evden Eve Nakliye",
      description:"2 komodin, 1 L koltuk, 2 masa, 2 ofis sandalyesi, 1 dolap, çamaşır kurutma ve çamaşır makinesi, 1 konsol, çift kişilik yatak, küçük kitaplık, piyano (ayaksız, sadece ust kısmı), 10-20 koli eşya. piyano dışında her şey demonte edilebilir. ",
      image:"/assets/parca-tasima.jpg"
    },
  ]

  return (
    <div className='flex-col flex justify-center items-center w-full mt-10 py-20 relative container mx-auto'>
      <h1 className='text-4xl font-bold'>En Yeni Nakliye Talepleri</h1>
      <p className='mt-5'><strong>borvey</strong> ile en güncel ilanlar ve taşıma taleplerini inceleyip teklif verebilirsiniz.</p>
      <div className='flex max-md:flex-col max-md:gap-y-40 justify-center items-center gap-x-4 w-full mt-10 relative'>
        {content?.map((item:any,index:any) => {
          return (
            <Fragment key={index}>
              <div className='w-96 h-60 relative flex justify-center items-center'>
                <Image src={item?.image} width={800} height={800} alt='' className='w-96 h-60 object-cover z-0 rounded-2xl border dark:border-white/30 border-black/30'/>
                <div className='w-70 h-52 top-36 rounded-md dark:bg-neutral-800 bg-white dark:text-white text-black p-5 flex-col flex text-center items-center justify-center absolute border dark:border-white/30 border-black/20 space-y-2'>
                  <h1 className='text-lg font-bold'>{item?.title}</h1>
                  <h2 className='font-bold dark:text-amber-500 text-amber-800'>{item?.category}</h2>
                  <p className='whitespace-pre-wrap text-sm truncate w-fit h-16'>{item?.description}</p>
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
      <div className='flex justify-center items-center w-full relative top-48'>
        <Link title='Giriş Yap' href={'/giris-yap'} type='button' className='rounded-md bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 py-2 cursor-pointer gap-x-4 group/btn flex items-center'><p>Tümünü Gör</p> <ChevronRight size={23} className='group-hover/btn:translate-x-2 transition-all' /></Link>
      </div>
    </div>
  )
}

export default TransportRequest