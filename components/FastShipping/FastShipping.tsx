/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { Fragment } from 'react'

type Props = {}

const FastShipping = (props: Props) => {

  const content = [
    {
      id:1,
      title:"Tek iş, Tek Odak: Nakliye",
      description:'Musluk tamiri, boya badana ya da "Öğretmenden temiz, keyfekeder araç" ilanlarının olduğu mecralarda neden daha fazla vakit kaybedip mutsuz olasınız ki?',
      image:'/assets/2.jpg'
    },
    {
      id:2,
      title:"Nakliyeci Size Ulaşsın",
      description:'Hem para harcayıp hem de hakkınız olan hizmeti almak için çabalamak istemiyorsanız şu anda doğru ekrana ve doğru siteye bakıyorsunuz...',
      image:'/assets/nakliyeci-ara.png'
    },
    {
      id:3,
      title:"Parayı Ödeyen Sizsiniz!",
      description:'Anneannenizin yadigarı şifonyer yeni evinize sağ salim ulaşacak mı? Yazlığınıza gidecek tek masa için 3 katı ücret ödeme kabusu çok mu yakın?',
      image:'/assets/yük-ara.png'
    },
    {
      id:4,
      title:"Kaosa borvey ile Son...",
      description:'"Marketlerden koli, kutu toplama seferberliği olmasın", "Beyaz eşyalarımı akrobasi yaparken izlemek istemiyorum" derseniz borvey burada...',
      image:'/assets/1.jpg'
    },
  ]

  return (
    <div className='flex-col flex justify-center items-center w-full mt-10 py-20 container mx-auto'>
      <h1 className='text-4xl font-bold max-md:text-3xl flex justify-center items-center w-full'>Ekonomik ve hızlı nakliyat</h1>
      <p className='mt-2 max-md:w-full max-md:text-sm flex justify-center items-center text-center'>Şehiriçi, şehirlerarası, ev, yazlık, ofis, parça eşya taşımalarınızda, nakliye çözümlerimizle hızlı ve hesaplı hizmet alın.</p>
      <div className='flex max-md:flex-wrap max-md:whitespace-pre-wrap justify-center items-center w-full gap-x-12 mt-20 max-md:gap-y-16'>
      {content?.map((item:any,index:any) => {
        return (
          <Fragment key={index}>
            <div className='flex-col items-center w-64 h-96 max-md:w-80 max-md:h-[300px] rounded-xl border-2 border-amber-500 relative p-5'>
              <h1 className='mt-16 text-2xl font-bold mb-3'>{item?.title}</h1>
              <p>{item?.description}</p>
              <div className='rounded-full size-28 border-2 border-amber-500 absolute -top-12 -right-9 bg-white cursor-pointer flex justify-center items-center overflow-hidden shrink-0 box-border'>
                <Image src={item?.image} width={800} height={800} alt='' className='object-contain size-28'/>
              </div>
            </div>
          </Fragment>
        )
      })}
      </div>
    </div>
  )
}

export default FastShipping