/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import InputThird from '@/components/Input/InputThird'
import Logo from '@/components/Logo/page'
import { findEmail } from '@/utils/emailToEmail'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import InputSMSOTP from '@/components/Input/InputSMSOTP'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { firebaseConfig } from '@/utils/firebase'
import { useTheme } from 'next-themes'
import InputPasswordRenew from '@/components/Input/InputPasswordRenew'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import updateUserCode from '@/utils/updateUserCode'
import { z } from 'zod'

interface FormData {
  email: string
  password: string
}

const formSchema = z.object({
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
  passwordAgain: z.string().min(8, "Şifre tekrar en az 8 karakter olmalıdır"),
}).refine((data) => data.password === data.passwordAgain, {
  message: "Şifreler eşleşmiyor",
  path: ["passwordAgain"],
})

const PasswordRenew = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const [ email,setEmail ] = useState('');
  const [phone, setPhone] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isNewPassword, setNewPassword] = useState(false)
  const [component, setComponent] = useState<'input-number' | 'input-otp'>('input-number')
  const [otpVal, setOTPValue] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const year = new Date().getFullYear()
  const { resolvedTheme } = useTheme()

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const code = generateCode()

  const handleLogin = async () => {
    setError(null)
    
    const findMail:any = await findEmail(email)

    try {

      const isOK = await updateUserCode({email,code})
      if(isOK === 'OK'){
        setIsCodeSent(true)
        const mailData = new FormData()
        mailData?.append("email",email)
        mailData?.append("fullName",findMail?.fullName)
        mailData?.append("code",code)
        mailData?.append("type","passwordReset")
        mailData?.append("route","borvey.com/sifre-yenile")
        await axios.post('/api/sendMail',mailData)
      }else{
        toast.error("Böyle bir email yok.")
      }

    } catch (err:any) {
      setError(err)
      toast.error("Böyle bir email yok.")
    }
  }

  const handleChange = async (event: any) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValues = {
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

    const { password } = formValues
    const formDat = new FormData();
    formDat.append("email",email)
    formDat.append("password",password)
    const { status } = await axios.post('/api/updatePass',formDat)
    if(status === 200){
      toast.success("Şifre değiştirildi.")
      router.push('/giris-yap')
    }else{
      toast.error("Bir şeyler yanlış gitti")
      return router.refresh()
    }
  }

  useEffect(() => {
    if(Number(otpVal)?.toString()?.length === 6){
      const verified = async () => {
        setLoading(true)
        const code:any = await findEmail(email)
        console.log("otpVal",otpVal)
        console.log("code",code)

        if(Number(otpVal) === Number(code?.code)){
          toast.success("Doğrulandı!")
          setNewPassword(true)
        }else{
          toast.error("Kod geçersiz")
        }

      }
      verified()
    }
  },[otpVal])

  return (
    <div className="flex items-center w-full max-md:w-screen max-md:h-screen max-md:overflow-hidden p-10 max-md:p-5 gap-x-8 dark:bg-[#0a0d11] bg-[#deebf8]">
      <div className="flex justify-center items-center w-full dark:bg-[#13171b] p-20 max-md:p-7 bg-white rounded-3xl h-[calc(100vh-75px)] max-md:h-auto max-md:py-10 relative border dark:border-white/5 border-black/15">
        <div className="absolute top-5 left-7 outline-none">
          <Logo />
        </div>
        <div className="flex-col flex items-center w-full justify-center p-20 max-md:px-7">
          <div className="flex-col flex justify-center items-center w-full space-y-2">
            <h1 className="text-4xl font-bold">Şifre Yenile</h1>

            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
              {isNewPassword &&
                <form action="POST" ref={formRef} onSubmit={handleChange} className="flex-col items-center space-y-4 w-[60%] max-md:w-full mt-10">
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

                <button
                  type="submit"
                  className="w-full p-5 bg-amber-500 hover:bg-amber-600 transition-all block mt-5 rounded-xl text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  Şifreyi Sıfırla
                </button>
                </form>
              }
              {isCodeSent ? 
              <div className={`${isNewPassword && 'hidden'} flex-col items-center space-y-4 w-[60%] max-md:w-full mt-10`}>
                
                <InputPasswordRenew loading={loading} setOTPValue={setOTPValue} otpVal={otpVal} />

              </div> 

              :<div className="flex-col items-center space-y-4 w-[60%] max-md:w-full mt-10">
                <label htmlFor="email" className="block relative w-full">
                <input
                required
                type="email"
                name="email"
                id="email"
                autoComplete='new-password'
                onChange={(e:any) => setEmail(e?.target.value)}
                className={error 
                ? "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white my-2 py-2 px-4 rounded-lg dark:text-red-900 text-red-500 dark:placeholder:text-red-900 placeholder:text-red-500 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border-2 dark:border-red-800 border-red-500 hover:border-2 hover:border-blue-500 " 
                : "peer valid:pt-4 transition-all ease-linear w-full dark:bg-[#15171B] bg-white my-2 py-2 px-4 rounded-lg text-neutral-600 dark:text-white placeholder:text-slate-600 outline-hidden active:border-2 active:border-blue-500 focus:border-blue-500 border dark:border-white/30 border-black/30 hover:border-2 hover:border-amber-500 "
                }/>
                <small className={error ? "absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none dark:text-red-900 text-red-500 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear" : "absolute left-4 top-1/2 -translate-y-1/2 text-lg cursor-text pointer pointer-events-none text-neutral-600 antialiased peer-valid:text-sm peer-valid:top-1/3 transition-all ease-linear"}>E-mail</small>
                </label>
                {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleLogin}
                  className="w-full p-5 bg-amber-500 hover:bg-amber-600 transition-all block mt-5 rounded-xl text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Yükleniyor...' : 'Mailime Kod Gönder'}
                </button>
              </div>
              }
            
          </div>
        </div>
        <h1 className="text-sm dark:text-white/30 text-black/70 flex justify-center items-center w-full absolute bottom-5 gap-x-1">
          © {year} <strong>borvey</strong> TÜM HAKLARI SAKLIDIR
        </h1>
      </div>
      <div className="h-[calc(100vh-75px)] w-[30%] object-cover rounded-3xl shrink-0 box-border max-md:hidden block max-md:h-fit">
        <Image
          src="/assets/login-image.png"
          width={800}
          height={800}
          alt=""
          className="h-[calc(100vh-75px)] w-[40vw] object-cover rounded-3xl max-md:hidden"
        />
      </div>
    </div>
  )
}

export default PasswordRenew