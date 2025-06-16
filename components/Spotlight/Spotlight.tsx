/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { Link } from 'lucide-react';
import Marquee from '../Marque/Marque';

type Props = {}

const useViewport = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial width on component mount
    setWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Run effect only on component mount

  return width;
};

const Spotlight = (props: Props) => {
  const viewportWidth:any = useViewport();


  return (
    <div className='flex-col flex justify-center items-center w-full mt-10 py-20'>
      <h1 className='text-4xl font-bold mb-5 max-md:text-3xl'>Öne Çıkan Nakliyeciler</h1>
      <p className='flex justify-center items-center w-[500px] max-md:w-full text-center'>Üyelerimizin kusursuz hizmet alıp memnuniyet yaşadığı nakliyecileri inceleyip yorum bırakabilirsiniz</p>
      <div className='flex justify-center items-center w-full mt-10'>
      <Marquee/>
      </div>
    </div>
  )
}

export default Spotlight