/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import PreLoading from '@/components/PreLoading/PreLoading';
import Image from 'next/image';
import React, { Suspense, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import Navbar from '../Navbar/page';
import { Pause, Play } from 'lucide-react';
type Props = {}

const AboutClient = (props: Props) => {
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState<boolean>(true);
  const [nav,setNav] = useState(false);

  const changeScroll = () => {
    if(scrollY >= 120){
      setNav(true)
    }else{
      setNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',changeScroll)
    return () => {
      window.removeEventListener('scroll',changeScroll)
    };
  }, []);

  const config = {
    file: {
        // forceHLS: true,
        // forceSafariHLS: true,
        attributes:{
        crossOrigin: 'anonymous'
        },
        // tracks:subtitles,
    },
  };
      
  const handlePlay = () => {
    setPlaying(true)
  };

  const handleToggleMuted = () => {
    setMuted(!muted);
  };  
  return (
    <>
    <div className={nav ? "flex" : 'max-md:hidden'}>
    <Navbar/>
    </div>
    <div className="relative h-[90vh] overflow-hidden max-md:h-[30vh] w-screen after:content-[''] after:flex after:items-center after:w-full after:bg-gradient-to-b dark:after:to-zinc-950 after:to-white after:from-transparent max-md:after:relative after:bottom-10 max-md:after:bottom-22 after:h-[10vh] max-md:after:h-[10vh] before:content-[''] before:flex before:items-center before:w-full before:bg-gradient-to-b dark:before:to-zinc-950 before:to-white before:to-95% dark:before:via-zinc-950/50 via-white/50 before:from-transparent before:absolute before:bottom-0 max-md:before:bottom-0 before:h-full max-md:before:h-14 before:z-[999]">
    <div className="flex justify-center items-center object-cover dark:bg-black bg-white relative bottom-0 max-md:bottom-0">
      <ReactPlayer
      ref={playerRef}
      width='100%'
      height='100%'
      url={'/video/moving.mp4'}
      playing={playing}
      loop={true}
      muted={muted}
      onPlay={handlePlay}
      config={config}
      />
    </div>

    <div className="flex justify-between items-center w-full py-2 max-md:py-5 absolute bottom-0 max-md:bottom-0 z-[999] max-md:bg-gradient-to-b max-md:dark:to-brandDark/50 max-md:dark:from-transparent max-md:to-white/50 max-md:from-transparent">
        <div className="flex-col items-center w-full ml-28 max-md:ml-3">
        <h1 className="uppercase font-black antialiased w-full max-lg:w-60 max-lg:max-h-20 max-lg:flex-wrap max-lg:whitespace-pre-wrap text-md sm:text-md md:text-3xl lg:text-3xl xl:text-6xl"></h1>
        <div className="flex items-center w-full gap-x-2max-md:gap-x-4 mt-0 max-md:mt-5">
        <button type="button"
        onClick={() => setPlaying(!playing)}
        className="bg-indigo-600 rounded-md items-center px-3 sm:px-7 py-1 text-gray-200 flex justify-center font-bold gap-x-1 text-sm sm:text-sm md:text-2xl lg:text-2xl xl:text-2xl hover:bg-indigo-700">{!playing ? <Play className="w-6 h-6 sm:w-12 sm:h-12"/> : <Pause className="w-6 h-6 sm:w-12 sm:h-12"/>}<span>{playing ? "Durdur" : "İzle"}</span></button>
         {muted == true ?
        <div onClick={handleToggleMuted} className="flex justify-end items-center self-center rounded-full p-2 bg-transparent  dark:hover:bg-zinc-950 hover:bg-zinc-950/50 hover:bg-opacity-50 z-50 transition-all cursor-pointer">
         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1 transition-all dark:text-white hover:text-white text-black w-4 sm:w-8" data-name="VolumeOff" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path></svg> 
        </div>
        :
        <div onClick={handleToggleMuted} className="flex justify-end items-center self-center rounded-full p-2 bg-transparent  dark:hover:bg-zinc-950 hover:bg-zinc-950/50 hover:bg-opacity-50 z-50 transition-all cursor-pointer">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr-4z3qvp e1svuwfo1 transition-all dark:text-white hover:text-white text-black w-4 sm:w-8" data-name="VolumeHigh" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z" fill="currentColor"></path></svg>
        </div>
        }
        </div>
        </div>

        
        <div className="flex-col items-center w-full max-md:hidden">
          <div className="flex-col items-center gap-x-2 text-base max-md:text-xs">
          <h1 className="dark:text-white text-neutral-800 text-3xl max-md:text-sm font-semibold whitespace-nowrap w-50">Türkiye'nin Lider Nakliye ve Taşımacılık Platformu</h1>
          <p className='dark:text-white/60 text-neutral-700 max-md:w-50'>Türkiye'nin dört bir yanında hızlı, güvenli ve profesyonel taşımacılık hizmetleri sunan lider nakliye platformuyuz.</p>

          </div>

        </div>

    </div>
  </div>
  <div className='flex-col flex justify-center items-center w-full dark:bg-zinc-950 space-y-40 py-52'>
    <div className='max-md:flex-col flex items-center gap-x-6 w-3/6'>
      <Image src={'/assets/about-illustration.png'} alt='' width={800} height={800} className='w-[500px] max-md:w-96 rounded-lg object-cover'/>
      <div className='flex-col items-center w-fit'>
        <h1 className='text-2xl font-bold dark:text-white/60 text-black/60'>Taşınma Sürecinizi Biz Yönetiriz</h1>
        <p className='dark:text-white/40 text-black/40'>Sokak sokak nakliyeci aramanıza, sayısız reklam arasında kaybolmanıza gerek yok. borvey, belirlediğiniz kriterlerde hizmet verenleri size getirir.</p>
      </div>
    </div>
    <div className='max-md:flex-col flex items-center gap-x-6 w-3/6'>
      <div className='flex-col items-center w-fit text-right'>
        <h1 className='text-2xl font-bold dark:text-white/60 text-black/60'>Güvenilir Nakliye Çözümleri</h1>
        <p className='dark:text-white/40 text-black/40'>borvey ile evini, iş yerini, yazlığına kargoyla gönderemediğin dolabını, ikinci elden aldığın eşyaları nasıl taşıyacağını düşünme!</p>
      </div>
      <Image src={'/assets/about-illustration2.png'} alt='' width={800} height={800} className='w-[500px] max-md:w-96 rounded-lg object-cover'/>
    </div>
    <div className='max-md:flex-col flex items-center gap-x-6 w-3/6'>
      <Image src={'/assets/about-illustration-3.png'} alt='' width={800} height={800} className='w-[500px] max-md:w-96 rounded-lg object-cover'/>
      <div className='flex-col items-center w-fit'>
        <h1 className='text-2xl font-bold dark:text-white/60 text-black/60'>Nakliye Maliyetlerinizi Azaltın</h1>
        <p className='dark:text-white/40 text-black/40'>borvey, hem birlikte çalıştığı nakliye firmalarının hem de nakliye hizmeti alan müşterilerinin memnuniyeti için gerekli tüm tedbirleri alır.</p>
      </div>
    </div>
    {/* <div className='flex-col flex items-center gap-x-6 w-3/6 space-y-4'>
      <Image src={'/assets/about-image4.png'} alt='' width={800} height={800} className='w-full h-80 rounded-lg object-cover'/>
      <div className='flex-col items-center w-fit space-y-2 justify-center text-center'>
        <h1 className='text-2xl font-bold dark:text-white/60 text-black/60'>Stressiz Bir Taşınma, Nakliye İçin İpuçları</h1>
        <p className='dark:text-white/40 text-black/40'>Sokak sokak, site site nakliyeci arayın, tanıdıklarınızdan öneri, referans isteyin,  iş arkadaşınızın evini 3 yıl önce taşıyan nakliyecinin telefonunu bulmaya çalışın... Ya da sadece borvey'de ücretsiz üyelik açıp ilanınızı bırakın.</p>
        <p className='dark:text-white/40 text-black/40'>Sonrasında borvey üyesi nakliyat firmaları size tekliflerini iletsin,  siz aralarından dilediğinizi seçin ve taşınma kabusu yaşamadan bu iş bitsin. borvey sizinle...</p>
      </div>
    </div> */}
  </div>
  </>
    )
}

export default AboutClient