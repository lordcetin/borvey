/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Navbar from '@/components/Navbar/page'
import { Search } from 'lucide-react'

type Props = {}

const Help = (props: Props) => {

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center w-full container mx-auto my-20'>
    <div className='flex-col flex justify-center items-center w-full'>
      <div className=' rounded-lg p-5 my-20 max-md:my-10 flex-col flex w-3/6 max-md:w-full'>
        <h1 className='flex justify-center items-center w-full text-xl font-bold text-white/60'>Merhaba! Size nasıl yardımcı olabiliriz?</h1>
        <div className='border dark:border-neutral-800 border-black/30 rounded-full p-1 mt-4 flex items-center gap-x-1'>
        <Search className='text-white/30 pl-2' size={28}/>
        <input type='text' placeholder='Konu Ara' className='outline-none px-3 rounded-full w-full py-3'/>
        </div>
      </div>
      <div className='flex justify-center items-center w-full py-20 max-md:py-10 max-md:px-5'>
      <Accordion
        type="single"
        collapsible
        className="w-3/6 max-md:w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="py-2 px-5 rounded-lg border my-2 dark:border-neutral-800 border-black/30 cursor-pointer">
          <AccordionTrigger className='text-xl font-bold'>Nakliyeci mi arıyorsunuz?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg font-medium border border-amber-500 p-5 rounded-lg">
            <p>
            borvey'e ücretsiz üye olup tüm taşıma işleriniz için nakliye şirketlerinden en uygun ve karlı teklifi alabilirsiniz. İster şehiriçi, şehirlerarası, ister, evden eve, ofis, parça eşya nakliyeniz için ilan bırakmanız yeterli.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="py-2 px-5 rounded-lg border my-2 dark:border-neutral-800 border-black/30 cursor-pointer">
          <AccordionTrigger className='text-xl font-bold cursor-pointer'>İlan verdikten sonra ne yapmam gerekir?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg font-medium border border-amber-500 p-5 rounded-lg">
            <p>
            İlanınız yayınlandıktan sonra nakliye firmalarından gelen teklifleri değerlendirmek için borvey'den e-posta, mesajlarınızı kontrol etmeniz yeterli. www.borvey.com veya mobil uygulamalarımızdan teklifleri inceleyip nakliyeciyle mesajlaşarak fiyat, takvim ve detayları netleştirebilirsiniz.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="py-2 px-5 rounded-lg border my-2 dark:border-neutral-800 border-black/30 cursor-pointer">
          <AccordionTrigger className='text-xl font-bold cursor-pointer'>Tek parça taşıma için ilan verebilir miyim?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg font-medium border border-amber-500 p-5 rounded-lg">
            <p>
            Evet. İster ev, ister ofis, ister tek parça ya da yakın mesafe için ilan oluşturup nakliye hizmeti alabilirsiniz. Şehiriçi, şehirlerarası, depo, ofis... İhtiyacınız olan tüm nakliye hizmetleri için ilan bırakmanız yeter de artar bile.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="py-2 px-5 rounded-lg border my-2 dark:border-neutral-800 border-black/30 cursor-pointer">
          <AccordionTrigger className='text-xl font-bold cursor-pointer'>Parsiyel ya da güzergahında yük mü arıyorsun?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg font-medium border border-amber-500 p-5 rounded-lg">
            <p>
            Nakliyeciler olarak en büyük maliyet kaleminiz olan akaryakıtı boşuna harcamayın. Boş ya da yarım yükle kaynaklarınızı israf etmek yerine borvey'e üye olup taşınma ilanlarına teklif verebilirsiniz. Dahası tüm hizmetler ücretsiz, komisyonsuz, kesintisiz. Tek yapmanız gereken borvey üzerinden ilanları takip etmeniz.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="py-2 px-5 rounded-lg border my-2 dark:border-neutral-800 border-black/30 cursor-pointer">
          <AccordionTrigger className='text-xl font-bold cursor-pointer'>Komisyon ödemek istemiyor musun?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-lg font-medium border border-amber-500 p-5 rounded-lg">
            <p>
            Nakliyecilerin kredi kartıyla, hesap numarasıyla ilgilenmiyoruz. Müşteri ile anlaştığın fiyatı son kuruşuna kadar yine müşteriden direkt, aracısız, kesintisiz almak hakkın. Ödemelere aracılık edip komisyon almak borvey'de yok. Emeğinin karşılığını kesintisiz almak istiyorsan borvey'i dene...
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </div>
    </div>
    </>
  )
}

export default Help