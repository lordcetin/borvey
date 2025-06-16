/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fragment, useLayoutEffect, useState } from 'react';

const Marquee = () => {
  const [ spotData,setSpotData ] = useState([])
  // Animasyon ayarları
  const marqueeVariantsLeft = {
    animate: {
      translateX: ['0%', '-115%'],
      transition: {
        translateX: {
          duration: 20, // Kayma hızı (saniye cinsinden)
          repeat: Infinity, // Sonsuz döngü
          ease: 'linear', // Düzgün, lineer hareket
        },
      },
    },
  };

  const marqueeVariantsRight = {
    animate: {
      translateX: ['-120%', '0%'],
      transition: {
        translateX: {
          duration: 25, // Kayma hızı (saniye cinsinden)
          repeat: Infinity, // Sonsuz döngü
          ease: 'linear', // Düzgün, lineer hareket
        },
      },
    },
  };

  useLayoutEffect(() => {
    const getSpot = async () => {
      const { data } = await axios.get('/api/spotlight')
      setSpotData(data)
    } 
    getSpot()
  },[])

  const content1 = [
    {
      id:1,
      title:"Fazlıoğlu Nakliyat",
      description:"Evden eve nakliye Parsiyel yük taşımacılığı Şehir içi ve şehirler arası nakliye Evden eve eleman...",
      image:'/assets/fazlioglu.jpg'
    },
    {
      id:2,
      title:"Levent Nakliyat",
      description:"Evden Eve nakliyat, asansörlü ve ambalajlı taşımacılık, parça eşya taşıma, şehiriçi ve şehirlerarası...",
      image:'/assets/levent.jpg'
    },
    {
      id:3,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },
    {
      id:4,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
    {
      id:5,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
    {
      id:6,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
    {
      id:7,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
    {
      id:8,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
  ]

  const content2 = [
    {
      id:1,
      title:"Tütüncüoğlu Nakliyat ",
      description:"Tütüncüoğlu Nakliyat olarak, yılların verdiği tecrübe ve güvenle şehir içi ve şehirler arası taşımac...",
      image:'/assets/tutuncuoglu.png'
    },
    {
      id:2,
      title:"Levent Nakliyat",
      description:"Evden Eve nakliyat, asansörlü ve ambalajlı taşımacılık, parça eşya taşıma, şehiriçi ve şehirlerarası...",
      image:'/assets/levent.jpg'
    },
    {
      id:3,
      title:"Fazlıoğlu Nakliyat",
      description:"Evden eve nakliye Parsiyel yük taşımacılığı Şehir içi ve şehirler arası nakliye Evden eve eleman...",
      image:'/assets/fazlioglu.jpg'
    },
    {
      id:4,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },
    {
      id:5,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },
    {
      id:6,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },
    {
      id:7,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },
    {
      id:8,
      title:"ŞEFNAK",
      description:"Şefnak Lojistik: Güven, Kalite ve Tecrübe ile Taşımacılığın Lideri 1973 yılından bu yana sektördeki ...",
      image:'/assets/nakliyecisefnak.jpg'
    },

  ]

  return (
    <div className="w-full py-4 flex-col space-y-2 justify-center items-center max-md:overflow-hidden">
      <motion.div
        variants={marqueeVariantsLeft}
        animate="animate"
        className="flex-col items-center whitespace-nowrap w-full max-md:w-96"
      >
        <div className='flex items-center gap-x-2 w-fit'>
          {spotData?.slice(0,8)?.map((item:any,index:any) => {
            return (
              <Fragment key={index}>
              <div className='w-[500px] max-md:w-96 h-72 rounded-xl overflow-hidden'>
                
                <div className='flex items-center relative w-full'>
                  <div className='absolute bg-linear-to-b dark:to-neutral-950/90 dark:from-neutral-800/90 to-neutral-200 from-neutral-400 w-[600px] max-md:w-96 h-72 top-0 left-0 z-999 p-20 max-md:py-20 max-md:px-7'>
                  <div className='flex items-center gap-x-4'>
                    <Image src={item?.image} alt='' width={800} height={800} className='size-9 z-0 object-cover rounded-full'/>
                    <h1 className='text-2xl font-bold'>{item?.firmName}</h1>
                  </div>
                      <h1 className='w-96 max-md:w-72 h-60 whitespace-pre-wrap mt-5'>{item?.description}</h1>
                  </div>
                  <Image src={item?.image} alt='' width={800} height={800} className='w-[600px] max-md:w-96 h-72 z-0 object-cover blur-2xl rounded-3xl'/>
                </div>
              </div>
              </Fragment>
            )
          })}

        </div>
      </motion.div>

      <motion.div
        variants={marqueeVariantsRight}
        animate="animate"
        className="flex-col items-center whitespace-nowrap w-[1920px]"
      >
        <div className='flex items-center gap-x-2 w-fit'>
          {spotData?.slice(8,16)?.map((item:any,index:any) => {
            return (
              <Fragment key={index}>
              <div className='w-[500px] max-md:w-96 h-72 rounded-xl overflow-hidden'>
                
                <div className='flex items-center relative w-full'>
                  <div className='absolute bg-linear-to-b dark:to-neutral-950/90 dark:from-neutral-800/90 to-neutral-200 from-neutral-400 w-[600px] max-md:w-96 h-72 top-0 left-0 z-999 p-20 max-md:py-20 max-md:px-7'>
                  <div className='flex items-center gap-x-4'>
                    <Image src={item?.image} alt='' width={800} height={800} className='size-9 z-0 object-cover rounded-full'/>
                    <h1 className='text-2xl font-bold'>{item?.firmName}</h1>
                  </div>
                      <h1 className='w-96 max-md:w-72 h-60 whitespace-pre-wrap mt-5'>{item?.description}</h1>
                  </div>
                  <Image src={item?.image} alt='' width={800} height={800} className='w-[600px] max-md:w-96 h-72 z-0 object-cover blur-2xl rounded-3xl'/>
                </div>
              </div>
              </Fragment>
            )
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;