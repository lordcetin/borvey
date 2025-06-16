/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Input from '../Input/Input'
import useAddressStore from '@/store/useAddressStore'
import Textarea from '../Input/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { CityData } from '@/utils/CityData'
import { z } from 'zod'
import { toast } from 'sonner'

type Props = {}

const formSchema = z.object({
  title: z.string().min(1, "Başlık alanı zorunludur"),
  description: z.string().min(1, "Açıklama alanı zorunludur"),
  provinceFrom: z.string().min(1, "İl (Nereden) alanı zorunludur"),
  districtFrom: z.string().min(1, "İlçe (Nereden) alanı zorunludur"),
  provinceTo: z.string().min(1, "İl (Nereye) alanı zorunludur"),
  districtTo: z.string().min(1, "İlçe (Nereye) alanı zorunludur"),
})

const AddressDetails = (props: Props) => {
  const { addressDetails, setAddressDetails } = useAddressStore()
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressDetails({ ...addressDetails, [name]: value })
    setValidationErrors({ ...validationErrors, [name]: '' })
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAddressDetails({ ...addressDetails, [name]: value })
    setValidationErrors({ ...validationErrors, [name]: '' })
  }

  const handleSelectChange = (key: string, value: string) => {
    setAddressDetails({ ...addressDetails, [key]: value })
    setValidationErrors({ ...validationErrors, [key]: '' })
  }

  const validateForm = () => {
    const validationResult = formSchema.safeParse(addressDetails)
    if (!validationResult.success) {
      const errors:any = validationResult.error.flatten().fieldErrors
      const formattedErrors: { [key: string]: string } = {}
      Object.keys(errors).forEach((key) => {
        formattedErrors[key] = errors[key]![0]
      })
      setValidationErrors(formattedErrors)
      toast.error("Lütfen tüm zorunlu alanları doldurun.")
      return false
    }
    return true
  }

  const selectedProvinceFrom = CityData.find(city => city.il_adi === addressDetails.provinceFrom)
  const selectedProvinceTo = CityData.find(city => city.il_adi === addressDetails.provinceTo)

  return (
    <div className='flex justify-between items-center w-full mt-10 py-10 gap-x-12 max-md:gap-x-4'>
      <div className='flex-col items-center w-3/6 max-md:w-full'>
        <Input
          label='Başlık'
          name='title'
          onChange={handleInputChange}
          id='title'
          type='text'
          value={addressDetails.title || ''}
          onError={!!validationErrors.title}
          errorMessage={validationErrors.title}
        />

        <Textarea
          label='Açıklama'
          name='description'
          onChange={handleTextareaChange}
          id='description'
          onError={!!validationErrors.description}
          errorMessage={validationErrors.description}
        />

        <div className='flex gap-4'>
          <Select onValueChange={(val) => handleSelectChange('provinceFrom', val)}>
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="İl (Nereden)" />
            </SelectTrigger>
            <SelectContent>
              {CityData.map((item, idx) => (
                <SelectItem key={idx} value={item.il_adi}>
                  {item.il_adi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => handleSelectChange('districtFrom', val)}
            disabled={!addressDetails.provinceFrom}
          >
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.districtFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="İlçe (Nereden)" />
            </SelectTrigger>
            <SelectContent>
              {selectedProvinceFrom?.ilceler.map((ilce, idx) => (
                <SelectItem key={idx} value={ilce.ilce_adi}>
                  {ilce.ilce_adi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex gap-4 my-4'>
          {/* İl (Nereye) */}
          <Select onValueChange={(val) => handleSelectChange('provinceTo', val)}>
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceTo ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="İl (Nereye)" />
            </SelectTrigger>
            <SelectContent>
              {CityData.map((item, idx) => (
                <SelectItem key={idx} value={item.il_adi}>
                  {item.il_adi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* İlçe (Nereye) */}
          <Select
            onValueChange={(val) => handleSelectChange('districtTo', val)}
            disabled={!addressDetails.provinceTo}
          >
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.districtTo ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="İlçe (Nereye)" />
            </SelectTrigger>
            <SelectContent>
              {selectedProvinceTo?.ilceler.map((ilce, idx) => (
                <SelectItem key={idx} value={ilce.ilce_adi}>
                  {ilce.ilce_adi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex justify-center items-center max-md:w-full max-md:hidden'>
        <Image
          src={'/assets/addressdetails.png'}
          alt='Adres Detay Görseli'
          width={800}
          height={800}
          className='object-cover w-full'
        />
      </div>
    </div>
  )
}

export default AddressDetails