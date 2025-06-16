/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { useLayoutEffect } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo/page";
import { Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useNotification from "@/store/useNotification";
import NotificationComp from "@/components/NotificationComp/NotificationComp";
import Pusher from 'pusher-js';
import { toast } from "sonner";
import useIsNotification from "@/store/useIsNotification";
import useSendTo from "@/store/useSendTo";
import { motion } from "framer-motion";
import useOfferMessage from "@/store/useOfferMessage";
import useGigCreate from "@/store/useGigCreate";
import SessionModal from "@/app/(dashboard)/_components/SessionModal";

type Props = {};

const AdminNavbar = (props: Props) => {
  const { setTheme } = useTheme()
  const pathname:any = usePathname()
  const router = useRouter()
  const { data:session }:any = useSession()
  const { openNotification,setOpenNotification } = useNotification()
  const { isNotification , setIsNotification } = useIsNotification()
  const { isCustomer , setIsCustomer } = useSendTo()
  const { offerMessage,setOfferMessage } = useOfferMessage()
  const { gigCreate,setGigCreate } = useGigCreate()

  return (
    <>
    <nav className="justify-between items-center w-full flex dark:bg-[#0a0d113b] bg-white p-3">

    <div>
      <div className=" items-center relative max-md:flex hidden">
        <Logo/>
      </div>
      <div className="text-xl pl-3 max-md:hidden">{
      pathname === '/admin/teklifler' ? "Teklifler"
      : pathname === '/admin/kullanicilar' ? "Kullanıcılar" 
      : pathname === '/admin/ilanlar' ? "İlanlar" 
      : pathname === '/admin/mesajlar' ? "Mesajlar" : null}
      </div>
    </div>

    <div className="relative left-8 flex items-center gap-x-4 max-md:hidden">
      
    </div>

    <motion.div
    initial={{ y: "-100%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
    }}
    className="flex items-center gap-x-4 max-md:gap-x-2 relative">
      <Tippy content={"Bildirimler"}>
        <div className="flex items-center relative">
        <Bell 
        onClick={() => {setOpenNotification(true),setIsNotification(false)}} 
        size={23} 
        className={pathname.startsWith(`/bildirimler`) 
        ? "text-teal-300 transition-all cursor-pointer" 
        : "text-neutral-500 dark:hover:text-white hover:text-black transition-all cursor-pointer"} 
        />
        {isNotification 
        && 
        <>
        <div className="dark:text-[#0a0d11] text-white hidden">{session?.user?.firmStatus !== true && isCustomer === 'user' ? toast(offerMessage,{icon:<Bell/>}) : null}</div>
        <span className={session?.user?.firmStatus !== true && isCustomer === 'user' ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" : "hidden"}>{toast?.length - 1}</span>
        </>
        }
        </div>
      </Tippy>

      <NotificationComp/>
      <SessionModal/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="border dark:border-white/30 border-black/30 cursor-pointer rounded-full z-999 mr-2 max-md:hidden">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mt-2 mr-2">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Aydınlık
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Koyu
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            Sistem
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>

  </nav>
  </>
  );
};

export default AdminNavbar;
