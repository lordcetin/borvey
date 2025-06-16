/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { findEmail } from '@/utils/emailToEmail'
import InputThird from '../Input/InputThird'
import { useTransport } from '@/store/useTransport'
import useAddressStore from '@/store/useAddressStore'
import { useStepStore } from '@/store/useStepStore'
import { usePathname } from 'next/navigation'
import { z } from 'zod'
import { Check, ChevronLeft } from 'lucide-react'
import useValidForm from '@/store/useValidForm'

type Props = {}

const formSchema = z.object({
  firstName: z.string().min(1, "Ad alanı zorunludur"),
  lastName: z.string().min(1, "Soyad alanı zorunludur"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  passwordAgain: z.string().min(8, "Şifre tekrar en az 8 karakter olmalıdır"),
}).refine((data) => data.password === data.passwordAgain, {
  message: "Şifreler eşleşmiyor",
  path: ["passwordAgain"],
})


const ProfileComplete = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLFormElement>(null)
  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)
  const pathname = usePathname()
  const { addressDetails } = useValidForm()

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const transportype = useTransport((state) => state.transportype)

  const handleRegister = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    setError(false)
    setValidationErrors({})
    const code = generateCode()

    const formData = new FormData(event.currentTarget)
    const emailData = formData.get('email') as string
    const firstNameData = formData.get('firstName') as string
    const lastNameData = formData.get('lastName') as string
    const fullNameData = `${firstNameData} ${lastNameData}`
    const mailData = new FormData()
    mailData?.append("email",emailData)
    mailData?.append("fullName",fullNameData)
    mailData?.append("code",code)
    mailData?.append("type","newUser")
    mailData?.append("route","borvey.com/aktivasyon")

    // await axios.post('/api/sendMail',mailData)

    const formValues = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordAgain: formData.get('passwordAgain') as string,
    }

    const validationResult = formSchema.safeParse(formValues)
    if (!validationResult.success) {
      const errors:any = validationResult.error.flatten().fieldErrors
      const formattedErrors: { [key: string]: string } = {}
      Object.keys(errors).forEach((key) => {
        formattedErrors[key] = errors[key]![0]
      })
      setValidationErrors(formattedErrors)
      setLoading(false)
      toast.error("Lütfen formdaki hataları düzeltin.")
      return
    }

    const { firstName, lastName, email, password } = formValues
    const fullName = `${firstName} ${lastName}`
    const findMail = await findEmail(email)

    if (email !== findMail?.email) {
      const form = {
        fullName,
        email,
        password,
        service:"customer",
        transportype,
        code,
        title: addressDetails?.title,
        description: addressDetails?.description,
        provinceFrom: addressDetails?.provinceFrom,
        provinceTo: addressDetails?.provinceTo,
        districtFrom: addressDetails?.districtFrom,
        districtTo: addressDetails?.districtTo,
      }
      
      const { status } = await axios.post(`/api/login`, form)
      if (status === 200) {

        await signIn('credentials', {
          email,
          password,
          // redirectTo: `/aktivasyon/${" "}`,
          redirectTo: `/panel/teklifler`,
        })
        setLoading(false)
        formRef.current?.reset()
      }
    
    } else {
      setLoading(false)
      setError(true)
      toast.error("Bu email zaten kullanılıyor.")
    }
    setLoading(false)
  }

  return (
    <div className='flex justify-between max-md:justify-center items-center w-full my-10 py-10 relative'>
      <div className='flex justify-center items-center w-[40vw] max-md:hidden'>
        <Image src={'/assets/customer_complete_illustration.png'} alt='' width={800} height={800} className='object-cover w-[40vh]'/>
      </div>
      <div className='flex-col flex items-center justify-center w-[500px] h-[420px] max-md:w-full max-md:h-[500px] max-md:box-border box-content shrink-0 self-start space-y-4 border dark:border-white/10 border-black/30 rounded-3xl p-20 max-md:p-10'>
        <h1 className='text-4xl max-md:text-lg font-bold flex justify-center items-center w-full mb-10 dark:text-white/80 text-black/80'>Profilini Tamamlayalım</h1>
        <form ref={formRef} onSubmit={handleRegister} className='flex-col flex gap-4 w-full'>
          <InputThird
            required={true}
            label='Ad'
            name='firstName'
            id='firstName'
            type='text'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.firstName}
            errorMessage={validationErrors.firstName}
          />
          <InputThird
            required={true}
            label='Soyad'
            name='lastName'
            id='lastName'
            type='text'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.lastName}
            errorMessage={validationErrors.lastName}
          />
          <InputThird
            required={true}
            label='Email'
            name='email'
            id='email'
            type='email'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.email || error}
            errorMessage={validationErrors.email}
          />
          <InputThird
            required={true}
            label='Şifre'
            name='password'
            id='password'
            type='password'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.password}
            errorMessage={validationErrors.password}
          />
          <InputThird
            required={true}
            label='Şifre Tekrar'
            name='passwordAgain'
            id='passwordAgain'
            type='password'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.passwordAgain}
            errorMessage={validationErrors.passwordAgain}
          />
          {pathname === '/kayit-ol' ? (
            <>
              {currentStep === 3 && (
                <div className='flex justify-between items-center w-full absolute -bottom-12 left-0'>
                  {currentStep > 0 ? (
                    <div
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'
                    >
                      <ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <button
                    type='submit'
                    disabled={loading}
                    className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer'
                  >
                    Kaydı Tamamla <Check size={28} className='translate-x-2 transition-all'/>
                  </button>
                </div>
              )}
            </>
          ) : pathname === '/hizmet-al' ? (
            <>
              {currentStep === 2 && (
                <div className='flex justify-between items-center w-full absolute -bottom-12 left-0'>
                  {currentStep > 0 ? (
                    <div
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'
                    >
                      <ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all'/> Geri
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <button
                    type='submit'
                    disabled={loading}
                    className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer'
                  >
                    Kaydı Tamamla <Check size={28} className='translate-x-2 transition-all'/>
                  </button>
                </div>
              )}
            </>
          ) : null}
        </form>
      </div>
    </div>
  )
}

export default ProfileComplete