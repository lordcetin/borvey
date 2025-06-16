/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useOpenOfferModal from '@/store/useOfferModal';
import Image from 'next/image';
import React, { useState } from 'react'
import Textarea from '../Input/Textarea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Input from '../Input/Input';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import DatePicker from '../DateRangePicker/DateRangePicker';
import { ChevronDown, SendHorizontal, X } from 'lucide-react';

type Props = {
  profileId:any;
  gigId:any;
  user:any;
  ilan:any;
}

const Offer = ({profileId,gigId,user,ilan}: Props) => {
  console.log("ilanId",gigId)
  const { data:session }:any = useSession()
  const router = useRouter()
  const { openOfferModal, setOpenOfferModal } = useOpenOfferModal()
  const [ offerText,setOfferText ] = useState("");
  const [ price,setPrice ] = useState("");
  const { ilanId } = useAppContext()
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [ selected,setSelected ] = useState<any>(false);
  
  const handleSubmitOffer = async () => {
    const formData = new FormData();
    formData.append("offerText",String(offerText));
    formData.append("price",String(price));
    formData.append("time",String(timestamp));
    formData.append("offeredUserId",profileId);
    formData.append("gigId",gigId);

    const { status } = await axios.post('/api/offers/sendOffer',formData);
    if(status === 200){
      toast.success("Teklifin gönderildi. Müşteri kontrol ederken beklemelisin.")
      router.push('/panel/ilanlar')
      setOpenOfferModal(false)
    }
  }

  const handleDateChange = (newTimestamp: number) => {
    setTimestamp(newTimestamp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seçilen tarih (timestamp):", timestamp);
    // Burada backend'e gönderme işlemini yapabilirsin
  };

  return (
    <>
    {openOfferModal && ilan?.id === ilanId &&
    <div className='flex justify-center items-center w-full'>
    <motion.div 
    initial={{ y: "100%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "-100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
    }}
    className='dark:bg-[#0c1014] bg-white flex-col items-center rounded-t-3xl w-3/4 max-md:w-full h-[calc(100vh-110px)] z-[999999] bottom-0 border-t border-x dark:border-white/10 border-black/50 fixed '>
      <div className='flex items-center justify-between w-full self-start p-3'>
        <h1 className='ml-3 text-xl font-black'>Teklif Ver</h1>
        <X size={27} onClick={() => setOpenOfferModal(false)} className='cursor-pointer dark:text-white/50 text-black/50 dark:hover:text-white hover:text-black'/>
      </div>
      <div className='flex-col items-center w-full p-5'>
        <div className="flex-col items-center border dark:border-white/5 border-black/50 rounded-xl p-5 w-full relative dark:bg-[#13171b] bg-[#deebf8]">
          <h1 className=' bg-amber-500 px-3 py-1 rounded-md text-amber-950 font-semibold text-sm cursor-pointer w-fit mb-3'>{ilan?.transportype === 'evdenEve' ? "Evden Eve Nakliyat" : ilan?.transportype === 'tekliUrun' ? "Parça Eşya Nakliyat" : ilan?.transportype === 'ofis' ? "Ofis, Depo Nakliyat" : ilan?.transportype === 'kisaMesafe' ? "Kısa Mesafe Nakliyat" : null}</h1>
          <div className='flex-col items-center space-y-2'>
            <div className='flex items-center gap-x-2'>
              <div className='flex items-center gap-x-2 dark:bg-neutral-800 bg-blue-100 rounded-md px-2 py-1 border dark:border-white/5 border-black/50 cursor-pointer'>
                <Image src={user?.image} alt={user?.fullName} width={800} height={800} className='object-cover w-6 rounded-full border dark:border-white/30 border-black/40'/>
                <h1 className='max-w-52 whitespace-nowrap truncate'>{user?.fullName}</h1>
              </div>
              <h1 className='text-2xl font-bold max-w-72 whitespace-nowrap truncate'>{ilan?.title}</h1>
            </div>
            <div className={`border dark:border-white/20 border-black/20 p-2 rounded-md whitespace-pre-wrap flex flex-wrap ${selected ? "max-h-40 overflow-x-hidden overflow-y-auto" : "max-h-21 overflow-hidden"} relative`}>
              {ilan?.description}
            </div>
            {ilan?.description?.length >= 595 && 
            <div className='flex justify-end items-center w-full'>
              <button type='button' onClick={() => setSelected(!selected)} className={` dark:bg-neutral-800 bg-amber-300/30 dark:text-white/70 text-black/70 border dark:border-white/20 border-black/20 cursor-pointer px-3 py-1 rounded-md font-bold text-sm flex items-center gap-x-1`}><ChevronDown size={18} className={selected ? "rotate-180 transition-all" : "rotate-0 transition-all"}/> {selected ? "Daha Az" : "Daha Fazla"}</button>
            </div>}
          </div>
          <div className='flex justify-between items-center mt-2 w-full'>
            <div className='flex items-center max-md:flex-col'>
              <div className='flex items-center gap-x-2 px-3 py-2 border dark:border-white/20 border-black/20 text-sm dark:bg-neutral-800 bg-amber-300/30 rounded-lg cursor-pointer max-md:text-xs'><h1 className='font-bold dark:text-white/30 text-black/70 max-md:text-[8px]'>NEREDEN:</h1><h1 className='text-xs max-md:text-[8px] whitespace-nowrap'>{ilan?.provinceFrom} / {ilan?.districtFrom}</h1></div>
              <div className='flex items-center w-7 h-[1px] border-t border-dashed dark:border-white/30 border-black/30 max-md:hidden'></div>
              <div className='items-center w-[1px] h-3 border-r border-dashed dark:border-white/30 border-black/30 hidden max-md:flex'></div>
              <div className='flex items-center gap-x-2 px-3 py-2 border dark:border-white/20 border-black/20 text-sm dark:bg-neutral-800 bg-amber-300/30 rounded-lg cursor-pointer max-md:text-xs'><h1 className='font-bold dark:text-white/30 text-black/70 max-md:text-[8px]'>NEREYE:</h1><h1 className='text-xs max-md:text-[8px] whitespace-nowrap'>{ilan?.provinceTo} / {ilan?.districtTo}</h1></div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center w-full'><div className='h-16 w-[1px] border border-dashed dark:border-white/10 border-black/50'></div></div>
        <div className='flex-col items-center w-full border dark:border-white/5 border-black/50 rounded-xl p-5 relative dark:bg-[#13171b] bg-[#deebf8] z-0'>
            <Textarea
            id='offerdescription'
            label='Teklif Açıklaması'
            name='offerDescription'
            onChange={(e:any) => setOfferText(e?.target.value)}
            onError={false}
            type='text'
            errorMessage={""}
            />
          <div className='flex items-center w-full gap-x-8'>
            <DatePicker onTimestampChange={handleDateChange} />
            <div className='w-96'>
            <Input
            id='price'
            label='İstenilen Ücret'
            name='price'
            onError={false}
            onChange={(e:any) => setPrice(e.target.value)}
            value={price}
            type='number'
            errorMessage={""}
            />
            </div>
            {/* <Input
            id='time'
            label='Teslimat Süresi'
            name='time'
            onError={false}
            onChange={(e:any) => setTransportTime(e.target.value)}
            value={transportTime}
            type='text'
            errorMessage={""}
            /> */}
            
          </div>

          <div className='flex justify-end items-end w-full'>
            <button onClick={handleSubmitOffer} type='button' className='flex items-center gap-x-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white px-4 py-2 cursor-pointer'><SendHorizontal size={22}/> Teklifi Gönder</button>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
    }
    </>
    
  )
}

export default Offer