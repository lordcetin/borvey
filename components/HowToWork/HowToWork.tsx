/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { Fragment } from 'react'

type Props = {}

const HowToWork = (props: Props) => {

  const content = [
    {
      id:1,
      title:"Ücretsiz İlanını Bırak",
      description:"Sadece ilanını bırak gerisini biz halledelim",
      image:"/assets/how-to.png"
    },
    {
      id:2,
      title:"Özel Fiyat Teklifleri Al",
      description:"Gelen teklifleri kontrol edip değerlendir",
      image:"/assets/how-to-2.png"
    },
    {
      id:3,
      title:"Karşılaştır ve Seç",
      description:"Sana en uygun gelen teklifi onayla",
      image:"/assets/how-to-3.png"
    },
  ]

  return (
    <div className='flex-col flex justify-center items-center w-full mt-32 py-20 text-center container mx-auto'>
      <h1 className='text-4xl font-bold'>Nakliyat Sistemi Nasıl Çalışıyor?</h1>
      <p className='w-[700px] mt-5 max-md:w-full'>Taşınma talebine gelen fiyat tekliflerini değerlendir, en uygun olanını seç ve gerisini bize bırak. borvey ile taşınma kaosu artık sana uzak, iyi hizmet almanın keyfini çıkar...</p>
      <div className='flex max-md:flex-col max-md:gap-y-8 justify-center items-center w-full mt-10'>
        {content?.map((item:any,index:any) => {
          return (
            <Fragment key={index}>
              <div className='w-96 h-96 flex-col flex justify-center items-center text-center'>
                <Image src={item?.image} width={800} height={800} alt='' className='object-cover mb-10'/>
                <h1>{item?.title}</h1>
                <p>{item?.description}</p>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default HowToWork