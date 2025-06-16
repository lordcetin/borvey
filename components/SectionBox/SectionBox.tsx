/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import React from 'react'

type Props = {}

const SectionBox = (props: Props) => {

  return (
    <div className='flex max-md:flex-col max-md:gap-y-8 justify-center items-center w-full mt-10 gap-x-4 container mx-auto text-white'>
      <div className='flex-col items-center rounded-lg bg-linear-to-b from-[#3b82f6] to-[#1d4ed8] py-12 px-8 w-[565px] h-[290px] max-md:w-full relative shadow-xl dark:shadow-black shadow-neutral-800/20 border dark:border-white/20 border-black/20'>
        <h1 className='text-3xl max-md:text-2xl font-bold'>Zahmetsiz Taşınma…</h1>
        <p className='w-[500px] mt-5 max-md:w-full'>Taşınma travma olmasın, borvey'e gelin! Kullanıcı dostu platformumuz sayesinde yeni ev ya da ofisinizi, parça eşya nakliyenizi planlayalım. Size en uygun fiyatlı hizmeti, istediğiniz zamanda sunalım...</p>
        <div className='flex justify-end items-end w-full absolute bottom-5 right-5'>
          <Link title='Hizmet Al' href={'/hizmet-al'} className='rounded-md bg-brandDark hover:bg-black/20 transition-all text-white px-8 py-2 cursor-pointer'>Nakliyeci Bul</Link>
        </div>
      </div>
      <div className='flex-col items-center rounded-lg bg-linear-to-b from-[#f59e0b] to-[#b45309] py-12 px-8 w-[565px] h-[290px] max-md:w-full relative shadow-xl dark:shadow-black shadow-neutral-800/20 border dark:border-white/20 border-black/20'>
        <h1 className='text-3xl max-md:text-2xl font-bold whitespace-nowrap'>Kamyonun Garajda Yatmasın...</h1>
        <p className='w-[500px] mt-5 max-md:w-full'>Yük için günlerce sevdiklerinden uzakta tır garajlarında beklemeye, boş ya da yarım yükle masraflı, mutsuz seferlere son. borvey'e gel, uygun güzergahta uygun müşteri bulalım; akaryakıta boşuna para harcama.</p>
        <div className='flex justify-end items-end w-full absolute bottom-5 right-5'>
          <Link title='Hizmet Ver' href={'/hizmet-ver'} className='rounded-md bg-brandDark hover:bg-black/20 transition-all text-white px-8 py-2 cursor-pointer'>Yük Bul</Link>
        </div>
      </div>
    </div>
  )
}

export default SectionBox