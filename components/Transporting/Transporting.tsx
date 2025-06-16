/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment } from 'react'

type Props = {}

const Transporting = (props: Props) => {
  const router = useRouter()

  const content = [
    {
      id:1,
      title:"Evden Eve Nakliye",
      image:'/assets/truck.png',
      color:'rgb(245, 154, 19)'
    },
    {
      id:2,
      title:"Parça Eşya Nakliye",
      image:'/assets/box.png',
      color:'rgb(48, 111, 223)'
    },
    {
      id:3,
      title:"Ofis Nakliye",
      image:'/assets/boxes.png',
      color:'rgb(36, 196, 187)'
    },
    {
      id:4,
      title:"Kısa Mesafeli Nakliye",
      image:'/assets/short.png',
      color:'rgb(56, 62, 66)'
    },
  ]

  return (
    <div className='flex-col flex justify-center items-center w-full mt-32 py-20 container mx-auto'>
      <div className='text-center flex-col items-center space-y-4'>
        <h1 className='text-4xl font-bold max-md:text-3xl'>Nakliyat Kategorileri</h1>
        <p className='w-[500px] max-md:w-full max-md:text-sm'>Güvenilir ve deneyimli nakliyecileri sizin için bulan borvey, doğrudan tedarikçi olmayıp sadece taşıma hizmeti almak isteyenlerle nakliye sektörü oyuncularını bir araya getiren paylaşım platformudur.</p>
      </div>
      <div className='flex max-md:flex-wrap max-md:flex max-md:whitespace-pre-wrap items-center justify-center w-full mt-10 gap-x-4 max-md:gap-4'>
      {content?.map((item:any,index:any) => {
        return (
          <Fragment key={index}>
            <div onClick={() => router.push('/hizmet-al')} className='cursor-pointer rounded-4xl border-2 border-amber-500 flex justify-center items-center size-64 max-md:size-40 z-0 relative group/box overflow-hidden'>
              <Image src={item?.image} width={800} height={800} alt='' className='object-cover w-96' />
              <div className='group-hover/box:flex justify-center items-center w-full absolute bottom-12 text-lg font-black text-white z-999 hidden max-md:text-xs'>{item?.title}</div>
              <div style={{
                background: `linear-gradient(rgba(255, 255, 255, 0) 0%, ${item?.color} 100%)`
              }} className="size-64 max-md:size-40 group-hover/box:flex justify-center items-center z-50 absolute top-0 left-0 rounded-4xl hidden transition-all duration-300"></div>
            </div>
          </Fragment>
        )
      })}
      </div>

    </div>
  )
}

export default Transporting