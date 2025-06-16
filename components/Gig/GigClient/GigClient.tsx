/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useChatQuery } from '@/hook/useChatQuery'
import { useChatSocket } from '@/hook/useChatSocket'
import { useSession } from 'next-auth/react'
import React, { Fragment, useState } from 'react'
import GigComp from '../GigComp/GigComp'
import Link from 'next/link'
import { isEmpty } from 'lodash'
import useGigCreate from '@/store/useGigCreate'
import GigCreateComp from '../GigCreateComp/GigCreateComp'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CityData } from '@/utils/CityData'
import { useRouter } from 'next/navigation'
import useFilterModal from '@/store/useFilter'
import { CaptionsOff, Funnel, FunnelX } from 'lucide-react'

type Props = {}

const GigClient = (props: Props) => {
  const {data:session}:any = useSession()
  const router = useRouter()
  const { filterModal, setFilterModal } = useFilterModal()
  const [ addressDetails, setAddressDetails ] = useState({
    provinceFrom:"",
    provinceTo:""
  })
  const [ category, setCategory ] = useState("")
  const { gigCreate,setGigCreate } = useGigCreate()
  const addKey = `ilan:${session?.user?.id}`
  const queryKey = `ilan:${session?.user?.id}:gig`;
  const updateKey = `ilan:${session?.user?.id}:gig:update`
  const apiUrl = "/api/gig/getGig"
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}:any = useChatQuery({
    queryKey,
    apiUrl,
    paramKey:"",
    paramValue:""
  })
  useChatSocket({queryKey,addKey,updateKey})

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

  const selectedProvinceFrom = CityData.find(city => city.il_adi === addressDetails.provinceFrom)

  const categories = [
    {id:0,title:"Evden Eve",val:"evdenEve"},
    {id:1,title:"Tekli Ürun",val:"tekliUrun"},
    {id:2,title:"Ofis",val:"ofis"},
    {id:3,title:"Kısa Mesafe",val:"kisaMesafe"},
  ]


  return (
    <>
    <div className='flex-col items-center w-full space-y-3 relative'>
    {gigCreate && 
    <GigCreateComp/>
    }
    {isEmpty(data?.pages[0]) &&
    <div className='flex justify-center items-center w-full h-[calc(100vh-250px)]'>
      <div className='flex-col flex justify-center items-center w-full space-y-4'>
          <CaptionsOff size={150} className='dark:text-neutral-700 text-black/70'/>
          <h1 className='dark:text-white/30 text-black/70 text-xl font-semibold'>Henüz hiç ilan yok.</h1>
          <Link title='Teklifler' href={'/panel/teklifler'} className='rounded-full dark:bg-white/50 bg-black/50 dark:text-black text-white dark:hover:bg-white hover:bg-black px-8 py-2 font-semibold transition-all'>Teklifleri Gör</Link>
      </div>
    </div>
    }

    {filterModal && !isEmpty(data?.pages[0]) &&
    <div className={`${session?.user?.firmStatus === false ? "hidden" : ""} flex-col items-center w-full whitespace-nowrap shrink-0 absolute top-0 left-0 z-[999999] dark:bg-brandDark bg-white p-3 space-y-4 rounded-lg border dark:border-white/30 border-black/30`}>
      <div className='flex items-center gap-x-4 border dark:border-white/30 border-black/30 p-3 rounded-md'>
        <h1>İl Seç</h1>
        <div className='flex items-center gap-x-4'>
          <Select onValueChange={(val) => handleSelectChange('provinceFrom', val)}>
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="İl" />
            </SelectTrigger>
            <SelectContent>
              {CityData.map((item, idx) => (
                <SelectItem key={idx} value={item.il_adi}>
                  {item.il_adi}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex items-center gap-x-4 border dark:border-white/30 border-black/30 p-3 rounded-md'>
        <h1>Kategori Seç</h1>
        <div className='flex items-center gap-x-4'>
          <Select onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/30'}`}>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item, idx) => (
                <SelectItem key={idx} value={item?.val}>
                  {item?.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
    }

    {!isEmpty(data?.pages[0]) && 
      <div className={`${session?.user?.firmStatus === false ? "hidden" : ""} flex items-center w-full gap-x-8 max-md:hidden mt-2 ml-7`}>
        <h1 className='flex items-center gap-x-2 dark:text-white/50 text-black/70'><Funnel /> Filtre</h1>
        <div className='flex items-center gap-x-4'>
          <h1>İl Seç</h1>
          <div className='flex items-center gap-x-4'>
            <Select onValueChange={(val) => handleSelectChange('provinceFrom', val)}>
              <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/70'}`}>
                <SelectValue placeholder="İl" />
              </SelectTrigger>
              <SelectContent>
                {CityData.map((item, idx) => (
                  <SelectItem key={idx} value={item.il_adi}>
                    {item.il_adi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h1>Kategori Seç</h1>
          <div className='flex items-center gap-x-4'>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className={`w-full cursor-pointer border ${validationErrors.provinceFrom ? 'dark:border-red-800 border-red-500' : 'dark:border-white/30 border-black/70'}`}>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item, idx) => (
                  <SelectItem key={idx} value={item?.val}>
                    {item?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    }


    {data?.pages?.map((group:any,i:any) => {
      return (
        <Fragment key={i}>
          {isEmpty(group?.filter((u:any) => u?.provinceFrom?.includes(addressDetails?.provinceFrom) && u?.transportype?.includes(category))) &&
          <>
          <div className='flex justify-center items-center w-full h-[calc(100vh-250px)]'>
            <div className='flex-col flex justify-center items-center w-full space-y-4'>
                <FunnelX size={150} className='dark:text-neutral-700 text-black/70'/>
                <h1 className='dark:text-white/30 text-black/70 text-xl font-semibold'>Filtre ile eşleşen ilan bulunamadı.</h1>
                <div onClick={() => {setAddressDetails({provinceFrom:"",provinceTo:""}),setCategory("")}} className='rounded-full cursor-pointer dark:bg-white/50 bg-black/50 dark:text-black text-white dark:hover:bg-white hover:bg-black px-8 py-2 font-semibold transition-all'>Filtreyi Sıfırla</div>
            </div>
          </div>
          </>
          }
          {session?.user?.firmStatus === true ? 
          <div className='flex-col items-center px-5 py-5 overflow-x-hidden overflow-y-auto w-full space-y-3 relative h-[calc(100vh-250px)] max-md:h-[calc(100vh-150px)]'>
          {group?.filter((u:any) => u?.provinceFrom?.includes(addressDetails?.provinceFrom) && u?.transportype?.includes(category))?.map((ilan:any,index:any) => {
            const user = ilan?.profiles;
            console.log("ilan",ilan)
            return (
              <Fragment key={index}>
                <GigComp ilan={ilan} user={user} index={index}/>
              </Fragment>
            )
          })}
          </div>
          :  
          <div className='flex-col items-center px-5 py-5 overflow-x-hidden overflow-y-auto w-full space-y-3 relative h-[calc(100vh-250px)] max-md:h-[calc(100vh-150px)]'>
          {group?.filter((u:any) => u?.profileId === session?.user?.id)?.map((ilan:any,index:any) => {
            const user = ilan?.profiles;
            return (
              <Fragment key={index}>
                <GigComp ilan={ilan} user={user} index={index}/>
              </Fragment>
            )
          })}
          </div>
          }
        </Fragment>
      )
    })}
    
    </div>
    </>
  )
}

export default GigClient