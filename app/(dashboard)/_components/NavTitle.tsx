/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import useFilterModal from '@/store/useFilter'
import { ChevronDown, Filter } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const NavTitle = (props: Props) => {
  const pathname = usePathname()
  const { data:session }:any = useSession()
  const { filterModal, setFilterModal } = useFilterModal()

  return (
    <div className='flex justify-around items-center w-full relative'>
    {pathname === '/panel/ilanlar' && <div onClick={() => setFilterModal(!filterModal)} className={`max-md:flex items-center hidden ${session?.user?.firmStatus === false ? "max-md:hidden" : ""}  ${filterModal ? "dark:text-white text-black" : "dark:text-white/50 text-black/50"}  max-md:mb-5 w-fit whitespace-nowrap`}><Filter className='mr-2' /> <h1>Filtre</h1> <ChevronDown size={23} className={filterModal ? "rotate-180 transition-all" : "rotate-0 transition-all"}/></div>}
    <h1 className="text-xl pl-3 max-md:block hidden cursor-default max-md:mb-5">{pathname === '/panel/teklifler' ? `${session?.user?.firmStatus ? "Teklif Verdiklerim" : "Teklifler"}` : pathname === '/panel/ilanlar' ? "İlanlar" : pathname === '/panel/mesajlar' ? "Mesajlar" : null}</h1>
    {pathname === '/panel/ilanlar' && <div className={`w-20 ${session?.user?.firmStatus === false ? "hidden" : ""}`}></div>}
    </div>
  )
}

export default NavTitle