/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Navbar from '@/components/Navbar/page'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import axios from 'axios';
import { toast } from 'sonner';
import Head from 'next/head';
import { LoaderCircle, Mail, MapPin, Phone } from 'lucide-react';
type Props = {}

const Contact = (props: Props) => {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);
  const [message,setMessage] = useState("");
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");



  const handleSubmit = async () => {
    setLoading(true)
    
    const formData = new FormData();
    formData.append("email",email)
    formData.append("fullName",fullName)
    formData.append("phone",phone)
    formData.append("message",message)

    const { status } = await axios.post('/api/contact',formData)

    if(status === 200){
      setLoading(false)
      toast.success("Talebiniz gönderildi.")
      formRef.current?.reset();
    }

    setLoading(false)
  };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'İletişim',
  url: 'https://borvey.com/iletisim',
  description: 'borvey, nakliyeciler ile müşterileri bir araya getiren güvenilir bir platformdur.',
};

  return (
    <>
    <Head>
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <Navbar/>
    <div className='flex justify-center items-center w-full container mx-auto my-40'>
      <div className='flex-col flex justify-center items-center w-full'>
          <h1 className='text-3xl font-bold'>Bize Ulaşın</h1>
          <div className='w-3/6 justify-between dark:bg-black/20 bg-black/10 rounded-lg flex items-center p-5 mt-20'>
            <div className='flex-col items-center p-5 bg-blue-500/20 rounded-lg border dark:border-blue-500 space-y-4'>
              <h1>İletişim Bilgileri</h1>
              <h1 className='flex items-center gap-x-4'><Phone /> +90 (532) 461 80 11</h1>
              <div className='flex items-center gap-x-4'>
                <Mail />
                <div className='flex-col items-center space-y-2'>
                  <Link title='bilgi@borvey.com' href={'mailto:bilgi@borvey.com'} className='block hover:underline'>bilgi@borvey.com</Link>
                  <Link title='destek@borvey.com' href={'mailto:destek@borvey.com'} className='block hover:underline'>destek@borvey.com</Link>
                </div>
              </div>
              <h1 className='flex items-center gap-x-4'><MapPin /> Küçükçekmece / İstanbul</h1>
            </div>
            <form ref={formRef} className='flex-col items-center spacey-4'>
              <input type='text' onChange={(e:any) => setFullName(e?.target.value)} required className='outline-none block my-2 border dark:border-white/30 border-black/30 px-3 py-1 rounded-md w-full' placeholder='İsim Soyisim'/>
              <div className='flex items-center gap-x-2'>
                <input type='text' onChange={(e:any) => setPhone(e?.target.value)} className='outline-none block my-2 border dark:border-white/30 border-black/30 px-3 py-1 rounded-md' placeholder='Telefon'/>
                <input type='text' onChange={(e:any) => setEmail(e?.target.value)} required className='outline-none block my-2 border dark:border-white/30 border-black/30 px-3 py-1 rounded-md' placeholder='E-mail'/>
              </div>
              <textarea onChange={(e:any) => setMessage(e?.target.value)} className='w-full border dark:border-white/30 border-black/30 rounded-lg max-h-36 min-h-20 h-20 px-3 pt-1 outline-none' placeholder='Mesajını Yaz'></textarea>
              <button onClick={handleSubmit} type='button' className='bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg px-5 py-2 flex justify-center items-center w-full gap-x-2'>{loading && <LoaderCircle size={22} className="animate-spin" />} Gönder</button>
            </form>
          </div>
      </div>
    </div>
    </>
  )
}

export default Contact