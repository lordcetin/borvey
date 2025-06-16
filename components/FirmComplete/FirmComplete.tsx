/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { useRoleStore } from '@/store/useRoleStore'
import { useStepStore } from '@/store/useStepStore'
import Textarea from '../Input/Textarea'
import { usePathname } from 'next/navigation'
import { z } from 'zod'
import { Plus, X, FileImage, ChevronLeft, Check } from 'lucide-react'

type Props = {}

const baseFormSchema = z.object({
  firstName: z.string().min(1, 'Ad alanı zorunludur'),
  lastName: z.string().min(1, 'Soyad alanı zorunludur'),
  firmName: z.string().min(1, 'Firma adı alanı zorunludur'),
  firmPhone: z.string().min(10, 'Telefon numarası en az 10 karakter olmalıdır'),
  firmDescription: z.string().min(1, 'Firma tanıtımı alanı zorunludur'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  passwordAgain: z.string().min(6, 'Şifre tekrar en az 6 karakter olmalıdır'),
  file: z
    .instanceof(File)
    .refine(
      (file) => ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type),
      'Yalnızca PNG, JPG, JPEG veya WEBP dosyaları kabul edilir'
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Dosya boyutu 5MB\'dan küçük olmalıdır'),
})

const formSchema = baseFormSchema.refine((data) => data.password === data.passwordAgain, {
  message: 'Şifreler eşleşmiyor',
  path: ['passwordAgain'],
})

const FirmComplete = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLFormElement>(null)
  const service = useRoleStore((state) => state.service)
  const currentStep = useStepStore((state) => state.currentStep)
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)
  const pathname = usePathname()

  const [fileUrl, setFileUrl] = useState<File | null>(null)
  const [selectedFile, setSelectedFile] = useState(false)
  const [loadingUp, setLoadingUp] = useState(false)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState<string | null>(null)

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoadingUp(true)
      const file = event.target.files?.[0]
      if (!file) {
        setLoadingUp(false)
        return
      }

      const validationResult:any = baseFormSchema.shape.file.safeParse(file)
      if (!validationResult.success) {
        setValidationErrors({
          ...validationErrors,
          file: validationResult.error.flatten().fieldErrors.file![0],
        })
        setLoadingUp(false)
        toast.error(validationResult.error.flatten().fieldErrors.file![0])
        return
      }

      setFileUrl(file)
      setImage(URL.createObjectURL(file))
      setSelectedFile(true)
      setValidationErrors({ ...validationErrors, file: '' })
      setLoadingUp(false)
    } catch (error) {
      console.error('Error uploading file:', error)
      setLoadingUp(false)
      toast.error('Dosya yüklenirken bir hata oluştu.')
    }
  }

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

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
      firmName: formData.get('firmName') as string,
      firmPhone: formData.get('firmPhone') as string,
      firmDescription: formData.get('firmDescription') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordAgain: formData.get('passwordAgain') as string,
      file: fileUrl,
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
      toast.error('Lütfen formdaki hataları düzeltin.')
      return
    }

    const { firstName, lastName, firmName, firmPhone, firmDescription, email, password } = formValues
    const fullName = `${firstName} ${lastName}`
    const findMail = await findEmail(email)

    if (email !== findMail?.email) {
      const form = new FormData()
      form.append('firstName', firstName)
      form.append('lastName', lastName)
      form.append('fullName', fullName)
      form.append('firmName', firmName)
      form.append('firmPhone', firmPhone)
      form.append('code', code)
      form.append('firmDescription', firmDescription)
      form.append('email', email)
      form.append('password', password)
      if (fileUrl) form.append('file', fileUrl)

      const { status } = await axios.post('/api/loginFirm', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (status === 200) {
        await signIn('credentials', {
          email,
          password,
          // redirectTo: `/aktivasyon/${" "}`,
          redirectTo: `/panel/ilanlar`,
        })
        setLoading(false)
        formRef.current?.reset()
        setFileUrl(null)
        setImage(null)
        setSelectedFile(false)
      }
    } else {
      setLoading(false)
      setError(true)
      toast.error('Bu kullanıcı adı ve email zaten kullanılıyor.')
    }
    setLoading(false)
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className='flex max-md:flex-col max-md:justify-center justify-between items-center w-full my-10 max-md:my-20 py-10 relative border dark:border-white/10 border-black/30 rounded-3xl'
      >
        <h1 className='text-4xl max-md:text-xl font-bold flex justify-center items-center w-full dark:text-white/80 text-black/80 absolute top-7'>
          Firma Profilini Tamamlayalım
        </h1>
        <div className='flex-col flex justify-center items-center w-[40vw] pl-20 max-md:p-10 max-md:w-full'>
          {selectedFile ? (
            <div className='flex justify-center items-center relative'>
              <X
                onClick={() => {
                  setSelectedFile(false)
                  setFileUrl(null)
                  setImage(null)
                  setValidationErrors({ ...validationErrors, file: '' })
                }}
                size={28}
                className='absolute top-0 right-0 dark:bg-neutral-800 bg-neutral-200 rounded-full border dark:border-white/30 border-black/60 cursor-pointer'
              />
              <Image
                src={image!}
                width={800}
                height={800}
                alt=''
                className='object-cover size-36 rounded-full border dark:border-white/30 border-black/60 cursor-pointer'
              />
            </div>
          ) : (
            <label
              className={`flex flex-col mb-3 items-center justify-center w-full h-40 border border-dashed ${
                validationErrors.file ? 'dark:border-red-800 border-red-500' : 'dark:border-white/20 border-black/60'
              } rounded-lg cursor-pointer dark:hover:border-white/60 hover:border-black dark:text-white/20 text-black/60 dark:hover:text-white/60 hover:text-black mt-2`}
            >
              <div className='flex flex-col justify-center items-center space-y-2'>
                <Plus size={48} />
                <div className='flex items-center whitespace-nowrap gap-x-2'>
                  <FileImage /> Firma Logosunu Yükle
                </div>
              </div>
              <input
                className='hidden'
                type='file'
                name='Asset'
                accept='image/png, image/jpg, image/jpeg, image/webp'
                onChange={uploadFile}
              />
              {validationErrors.file && (
                <small className='text-red-500 dark:text-red-900 mt-2'>{validationErrors.file}</small>
              )}
            </label>
          )}
          <InputThird
            label='Firma Adı'
            name='firmName'
            id='firmName'
            type='text'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.firmName}
            errorMessage={validationErrors.firmName}
            required={true}
          />
          <InputThird
            label='Firma Telefon Numarası'
            name='firmPhone'
            id='firmPhone'
            type='text'
            value={(e: any) => e.target.value}
            onError={!!validationErrors.firmPhone}
            errorMessage={validationErrors.firmPhone}
            required={true}
          />
          <Textarea
            id='firmDescription'
            label='Firma Tanıtımı'
            name='firmDescription'
            onChange={(e: any) => {
              setValidationErrors({ ...validationErrors, firmDescription: '' })
              e.target.value
            }}
            onError={!!validationErrors.firmDescription}
            errorMessage={validationErrors.firmDescription}
            type='text'
          />
        </div>
        <div className='flex-col flex items-center justify-center w-[500px] h-[420px] max-md:w-full box-content shrink-0 self-start space-y-4 p-20 max-md:p-10 max-md:box-border'>
          <div className='flex-col flex gap-4 w-full'>
            <InputThird
              label='Ad'
              name='firstName'
              id='firstName'
              type='text'
              value={(e: any) => e.target.value}
              onError={!!validationErrors.firstName}
              errorMessage={validationErrors.firstName}
              required={true}
            />
            <InputThird
              label='Soyad'
              name='lastName'
              id='lastName'
              type='text'
              value={(e: any) => e.target.value}
              onError={!!validationErrors.lastName}
              errorMessage={validationErrors.lastName}
              required={true}
            />
            <InputThird
              label='Email'
              name='email'
              id='email'
              type='email'
              value={(e: any) => e.target.value}
              onError={!!validationErrors.email || error}
              errorMessage={validationErrors.email}
              required={true}
            />
            <InputThird
              label='Şifre'
              name='password'
              id='password'
              type='password'
              value={(e: any) => e.target.value}
              onError={!!validationErrors.password}
              errorMessage={validationErrors.password}
              required={true}
            />
            <InputThird
              label='Şifre Tekrar'
              name='passwordAgain'
              id='passwordAgain'
              type='password'
              value={(e: any) => e.target.value}
              onError={!!validationErrors.passwordAgain}
              errorMessage={validationErrors.passwordAgain}
              required={true}
            />
            {pathname === '/kayit-ol' ? (
              <>
                {currentStep === (service === 'service' ? 1 : 1) && (
                  <div className='flex justify-between items-center w-full absolute -bottom-17 left-0'>
                    {currentStep > 0 ? (
                      <div
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'
                      >
                        <ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all' /> Geri
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <button
                      type='submit'
                      disabled={loading || loadingUp}
                      className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer'
                    >
                      Kaydı Tamamla <Check size={28} className='translate-x-2 transition-all' />
                    </button>
                  </div>
                )}
              </>
            ) : pathname === '/hizmet-ver' ? (
              <>
                {currentStep === (service === 'service' ? 0 : 1) && (
                  <div className='flex justify-between items-center w-full absolute -bottom-17 left-0'>
                    {currentStep > 0 ? (
                      <div
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className='flex justify-center items-center px-8 py-3 rounded-lg text-black dark:text-white hover:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 bg-neutral-200 hover:bg-neutral-400 border dark:border-white/30 border-white/30 transition-all cursor-pointer group/btn1'
                      >
                        <ChevronLeft size={28} className='group-hover/btn1:-translate-x-2 transition-all' /> Geri
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <button
                      type='submit'
                      disabled={loading || loadingUp}
                      className='flex justify-center items-center px-8 py-3 rounded-lg text-white bg-amber-500 hover:bg-amber-600 border border-amber-300 transition-all cursor-pointer'
                    >
                      Kaydı Tamamla <Check size={28} className='translate-x-2 transition-all' />
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </form>
    </>
  )
}

export default FirmComplete