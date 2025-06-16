/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Link from "next/link";
import { Bell, ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react";
import SessionModal from "@/app/(dashboard)/_components/SessionModal";
import NotificationComp from "../NotificationComp/NotificationComp";
import useNotification from "@/store/useNotification";
import useIsNotification from "@/store/useIsNotification";
import useSendTo from "@/store/useSendTo";
import { toast } from "sonner";
import useOfferMessage from "@/store/useOfferMessage";
import useAdminModal from "@/store/useAdminModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import { usePathname } from "next/navigation";
type Props = {};

const Navbar = (props: Props) => {
  const {theme, setTheme , resolvedTheme} = useTheme();
  const [nav,setNav] = useState(false);
  const { data:session }:any = useSession()
  const pathname:any = usePathname()

  const { openNotification,setOpenNotification } = useNotification()
  const { isNotification , setIsNotification } = useIsNotification()
  const { isAdminOpenModal , setIsAdminModal } = useAdminModal()
  const { isCustomer } = useSendTo()
  const [ socketMessage,setSocketMessage ] = useState("");
  const { offerMessage } = useOfferMessage()
  const [ mobileMenu ,setMobileMenu ] = useState(false);

  const changeScroll = () => {
    if(scrollY >= 120){
      setNav(true)
    }else{
      setNav(false)
    }
  }

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);


  useEffect(() => {
    window.addEventListener('scroll',changeScroll)
    return () => {
      window.removeEventListener('scroll',changeScroll)
    };
  }, []);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === 's') {
          event.preventDefault()
          setIsAdminModal(true)
          
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    }, []);
    

  return (
    <>
    <motion.div 
    initial={{ y: "-100%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
    }}
    className="justify-center items-center w-full max-md:w-screen flex fixed top-12 left-0 z-[9999] max-md:px-3 gap-x-2">
    <div className={`flex justify-between items-center w-3/6 max-md:w-full max-md:py-2 border dark:border-white/20 border-black/20 rounded-full px-2 dark:bg-[#0a0d1162] ${nav ? "bg-white/50" : "bg-white/15"} backdrop-blur-sm`}>

    <div className="items-center relative max-md:block hidden">
      <Link title="Anasayfa" href='/' className="items-center relative max-md:block hidden">
        <Image src={resolvedTheme === 'light' ? '/borvey.png' : resolvedTheme === 'dark' ? '/assets/logo-white.png' : '/borvey.png'} width={800} height={800} alt="Borvey.com Logo" className="w-28 max-md:w-20 object-cover cursor-pointer flex"/>
      </Link>
    </div>

    <div className="flex items-center gap-x-4 pl-2 py-2 rounded-full max-md:hidden">
        <Link title="Anasayfa" href='/' className="relative flex items-center gap-x-[2px]">
          <Image src={resolvedTheme === 'light' ? '/borvey.png' : resolvedTheme === 'dark' ? '/assets/logo-white.png' : '/borvey.png'} width={800} height={800} alt="Borvey.com Logo" className="w-36 object-cover cursor-pointer flex"/>
        </Link>
    </div>

    {session ? 
    <div className="flex items-center gap-x-2 relative">
    <Tippy content={"Bildirimler"}>
      <div className="flex items-center relative">
      <Bell 
      onClick={() => {setOpenNotification(true),setIsNotification(false)}} 
      size={23} 
      className={pathname.startsWith(`/bildirimler`) 
      ? "text-teal-300 transition-all cursor-pointer mr-2 max-md:-mr-2" 
      : "dark:text-white/50 text-neutral-500 dark:hover:text-white hover:text-black transition-all cursor-pointer mr-2 max-md:-mr-2"} 
      />
      {isNotification 
      && 
      <>
      <div className="dark:text-[#0a0d11] text-white hidden">{session?.user?.firmStatus !== isCustomer ? toast(offerMessage,{icon:<Bell/>}) : null}</div>
      <span className={session?.user?.firmStatus !== isCustomer ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" : "hidden"}>{toast?.length - 1}</span>
      </>
      }
      </div>
    </Tippy>
    <div>
      <NotificationComp/>
    </div>
    <SessionModal/>
    </div>
    :
    <>
    <div className="flex items-center gap-x-2 pr-1 max-md:hidden">
      <Tippy content={"Müşteri"}><Link title="Hizmet Al" href={`/hizmet-al`} className="border dark:border-white/20 border-black/20 px-5 py-2 max-md:px-3 max-md:py-1 max-md:text-xs max-md:whitespace-nowrap rounded-full text-md bg-blue-500 hover:bg-blue-700 transition-all font-semibold text-white">Hizmet Al</Link></Tippy>
      <Tippy content={"Taşımacı"}><Link title="Hizmet Ver" href={`/hizmet-ver`} className="border dark:border-white/20 border-black/20 px-5 py-2 max-md:px-3 max-md:py-1 max-md:text-xs max-md:whitespace-nowrap rounded-full text-md bg-amber-500 hover:bg-amber-600 transition-all font-semibold text-white">Hizmet Ver</Link></Tippy>
      <Link title="Giriş Yap" href={`/giris-yap`} className={`${nav ? "dark:bg-white/20 dark:text-white" : ""} border dark:border-white/20 border-black px-5 py-2 max-md:px-3 max-md:py-1 max-md:text-xs max-md:whitespace-nowrap rounded-full text-md dark:bg-white dark:text-black text-black font-semibold dark:hover:bg-black dark:hover:text-white hover:bg-black hover:text-white transition-all`}>Giriş Yap</Link>
    </div>
    <div className="max-md:flex items-center hidden relative">
      <div onClick={() => setMobileMenu(!mobileMenu)} className="flex items-center border dark:border-neutral-200 border-black rounded-full pr-1 pl-3">
        <Menu size={18}/>
        <h1 className="px-1">Menü</h1>
        <ChevronDown className={mobileMenu ? "text-2xl rotate-180 transition-all duration-300 ease-in-out" : "text-2xl rotate-0 transition-all duration-300 ease-in-out"}/>
      </div>
      {mobileMenu && <MobileMenu/>}
    </div>
    </>
    }
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={`${nav ? "hidden" : "flex"} transition-all border dark:border-white/30 border-black/30 dark:bg-black/30 bg-white/30 cursor-pointer rounded-full h-[3rem] w-[3rem] max-md:hidden`}>
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Açık/Koyu Tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="z-[9999]">
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
  </>
  );
};

export default Navbar;
