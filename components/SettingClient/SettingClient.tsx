/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Tippy from '@tippyjs/react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import InputSecond from '../Input/InputSecond'
import InputThird from '../Input/InputThird'
import { z } from 'zod'
import { toast } from 'sonner'
import { findEmail } from '@/utils/emailToEmail'
import { saltAndHashPassword } from '@/lib/solvePass'
import { isEmpty } from 'lodash'

type Props = {
  user:any
}

const SettingClient = ({user}: Props) => {
  const {data:session,update}:any = useSession()
  const [fileUrl,setFileUrl] = useState<any>("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedImage,setSelectedImage] = useState<any>("")
  const [openModal,setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLFormElement>(null)

  const handleUpload = async (target:any) => {
    const file = target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFileUrl(file)
    setOpenModal(false)
    const formData = new FormData()
    formData.append('image',file)

    const {data,status} = await axios.post('/api/upload/profilePic', formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      },
    });

    console.log("data",data)

    if(status === 200) {
      await update({ image:data })
    }
  }


  const handleUpdate = async (event: any) => {
    event.preventDefault()
    setError(false)
    setValidationErrors({})
    setLoading(true);
    const formData = new FormData(event.currentTarget)
    const formValues = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      firmName: formData.get('firmName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordAgain: formData.get('passwordAgain') as string,
    }

    const { firstName, lastName, email, password, firmName, passwordAgain } = formValues
    const fullName = `${firstName} ${lastName}`
    if(isEmpty(password)){
    const form = {
      userId: user?.id,
      fullName: fullName || user?.fullName,
      firmName: firmName || user?.firmName,
      email: email || user?.fullName,
      password:""
    }
    const { status } = await axios.post(`/api/updateDatas`, form)
    if (status === 200) {
      await update({
        fullName:fullName || user?.fullName ,
        firmName:firmName || user?.firmName ,
        email: email || user?.email,
      })
    }
    setLoading(false);
    }else{
      if(password !== passwordAgain){
        toast.error("Şifreler aynı değil")
      }
      const form = {
        userId: user?.id,
        fullName:fullName || user?.fullName ,
        firmName:firmName || user?.firmName ,
        email: email || user?.email,
        password: password || user?.hashedPassword,
      }
      const { data,status } = await axios.post(`/api/updateDatas`, form)
      if (status === 200) {
        await update({
          fullName:fullName || user?.fullName ,
          firmName:firmName || user?.firmName ,
          email: email || user?.email,
          password: data?.hashedPassword,
        })
      }
    }
  }

  return (
    <div className='flex justify-center items-center w-full container mx-auto'>
      <div className='flex-col flex justify-center items-center w-full gap-x-6'>
        <h1 className='text-2xl font-black my-10'>Profil Ayarları</h1>
        <div className='flex items-center w-full border dark:border-white/30 border-black/30 p-8 rounded-3xl self-start'>
          
            <div className='flex justify-center items-center w-full'>
            <label className='cursor-pointer group/item size-50 rounded-full'>
            <div className='flex justify-center items-center size-50 border dark:border-white/30 border-black/30 dark:group-hover/item:border-white group-hover/item:border-white transition-all rounded-full'>
              {selectedImage ? <div className='flex items-center relative'><Image src={selectedImage} alt='' width={800} height={800} className='object-cover size-50 rounded-full'/></div> : <Tippy content={"Profil Resmini Değiştir"}>{session?.user?.image ? <Image src={session?.user?.image} alt='' width={800} height={800} className='object-cover size-50 rounded-full'/> : <div className='size-50 rounded-full dark:bg-neutral-800 bg-neutral-200 animate-pulse'></div>}</Tippy>}
            </div>
            <input
              className="hidden absolute h-52 -left-96"
              type="file"
              name="asset"
              accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
              onChange={({target}) => handleUpload(target)}
            />
            </label>
            </div>
            
            <div className='flex-col items-center w-full'>
            <form ref={formRef} onSubmit={handleUpdate} className='flex-col flex gap-4 w-full'>
              <div className='flex items-center gap-x-3'>
              <InputThird
                label='Ad'
                name='firstName'
                id='firstName'
                type='text'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.firstName}
                errorMessage={validationErrors.firstName}
              />
              <InputThird
                label='Soyad'
                name='lastName'
                id='lastName'
                type='text'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.lastName}
                errorMessage={validationErrors.lastName}
              />
              </div>
              {session?.user?.firmStatus === true &&
              <InputThird
                label='Firma Adı'
                name='firmName'
                id='firmName'
                type='text'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.email || error}
                errorMessage={validationErrors.email}
              />}
              <InputThird
                label='Email'
                name='email'
                id='email'
                type='text'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.email || error}
                errorMessage={validationErrors.email}
              />
              <InputThird
                label='Şifre'
                name='password'
                id='password'
                type='password'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.password}
                errorMessage={validationErrors.password}
              />
              <InputThird
                label='Şifre Tekrar'
                name='passwordAgain'
                id='passwordAgain'
                type='password'
                required={false}
                value={(e: any) => e.target.value}
                onError={!!validationErrors.passwordAgain}
                errorMessage={validationErrors.passwordAgain}
              />
              <button
              type='submit'
              className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-600 hover:bg-amber-700 border border-amber-300 transition-all cursor-pointer'
              >
              Bilgileri Güncelle</button>
            </form>
            </div>
            
        </div>

      </div>
    </div>
  )
}

export default SettingClient