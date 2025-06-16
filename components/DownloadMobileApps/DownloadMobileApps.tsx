/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const DownloadMobileApps = (props: Props) => {
  return (
    <div className='flex justify-center items-center w-full my-20 container mx-auto'>
    <div className='flex max-md:flex-col justify-between items-center w-[60vw] max-md:h-[600px] max-md:w-full mt-32 max-md:mt-52 py-10 relative border border-black/20 dark:border-white/10 rounded-2xl'>
      <Image src={'/assets/phone-image.png'} width={800} height={800} alt='' className='object-cover w-96 absolute max-md:-top-46'/>
      <div className='w-full'></div>
      <div className='flex-col items-center pr-20 max-md:p-0 max-md:justify-center max-md:w-full max-md:text-center'>
        <div className='flex items-center gap-x-2 max-md:justify-center max-md:text-center max-md:mt-7'><Image src={'/borvey-logo.png'} width={800} height={800} alt='' className='object-cover w-12'/> <h1 className='text-4xl font-bold whitespace-nowrap max-md:text-3xl'>Uygulamamızı İndirin!</h1> </div>
        <p className='w-[400px] max-md:w-full max-md:px-3 mt-5 max-md:justify-center max-md:text-center max-md:text-sm'>Evinizi, ofisinizi, parça eşyanızı taşıtmak ya da taşıma hizmeti vermek için uygulamamızı ücretsiz indirin, size özel hizmetlerimize mobil cihazlarınızdan hemen ulaşın.</p>
        <div className='flex justify-center items-center gap-x-4 w-full mt-10'>
          <Link title='Google Play' about='Google Play' href={'https://play.google.com/store/apps/details?id=com.tr.bi.borvey&amp;hl=tr'}><Image src={'/assets/google-play-downloa.png'} alt='' width={800} height={800} className='object-cover w-60 max-md:w-40'/></Link>
          <Link title='Apple Store' about='Apple Store' href={'https://apps.apple.com/tr/app/borvey-yeni-nesil-ta%C5%9F%C4%B1mac%C4%B1l%C4%B1k/id6478465673?l=tr'}><Image src={'/assets/apple.png'} alt='' width={800} height={800} className='object-cover w-60 max-md:w-40'/></Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default DownloadMobileApps