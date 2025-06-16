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
import Link from "next/link";
import SessionModal from "./SessionModal";
import { Bell, CircleHelp, Moon, Sun } from "lucide-react"
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
import { showBrowserNotification } from "@/utils/showNotification";
import { playSound } from '@/lib/playSound';

type Props = {};

const DashboardNavbar = (props: Props) => {
  const { setTheme } = useTheme()
  const pathname:any = usePathname()
  const router = useRouter()
  const { data:session }:any = useSession()
  const { openNotification,setOpenNotification } = useNotification()
  const { isNotification , setIsNotification } = useIsNotification()
  const { isCustomer , setIsCustomer } = useSendTo()
  const { offerMessage,setOfferMessage } = useOfferMessage()
  const { gigCreate,setGigCreate } = useGigCreate()

  useLayoutEffect(() => {
    const pusher = new Pusher(`0c239ee8bc9e9da59c87`, {
      cluster: 'eu'
    });

      const channel:any = pusher.subscribe(`${session?.user?.id}`);

      channel.bind('offer', function(data:any) {
        setOfferMessage(data?.message)
        if(data?.sendTo === 'user'){
          setIsCustomer(data?.sendTo)
          playSound('/sounds/notify.mp3');
        }
        setIsNotification(true);
        showBrowserNotification(
          "Yeni Teklif!",
          data?.message,
          `/panel/teklifler` // burada yönlendirme linkini dinamikleştir
        );
        

      });

    return () => {
      // React bileşen unmount edildiğinde burada temizleme işlemini yapabilirsiniz
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, [session]);

  useLayoutEffect(() => {
    const pusher = new Pusher(`0c239ee8bc9e9da59c87`, {
      cluster: 'eu'
    });

      const channel:any = pusher.subscribe(`${session?.user?.id}`);

      channel.bind('offerUpdate', function(data:any) {
        console.log("data",data)
        setOfferMessage(data?.message)
        setIsCustomer("offerUpdate")
        setIsNotification(true);
        showBrowserNotification(
          "Teklifini İncele!",
          data?.message,
          `/panel/teklifler` // burada yönlendirme linkini dinamikleştir
        );
      });
      playSound('/sounds/notify.mp3');

    return () => {
      // React bileşen unmount edildiğinde burada temizleme işlemini yapabilirsiniz
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, [session]);

  useLayoutEffect(() => {
    const pusher = new Pusher(`0c239ee8bc9e9da59c87`, {
      cluster: 'eu'
    });

      const channel:any = pusher.subscribe(`${session?.user?.id}`);

      channel.bind('comment', function(data:any) {
        console.log("data",data)
        setOfferMessage(data?.message)
        setIsCustomer("comment")
        setIsNotification(true);
        showBrowserNotification(
          "Yorum Yapıldı!",
          data?.message,
          `/panel/teklifler` // burada yönlendirme linkini dinamikleştir
        );
        playSound('/sounds/notify.mp3');
      });

    return () => {
      // React bileşen unmount edildiğinde burada temizleme işlemini yapabilirsiniz
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, [session]);

  useLayoutEffect(() => {
    const pusher = new Pusher(`0c239ee8bc9e9da59c87`, {
      cluster: 'eu'
    });

      const channel:any = pusher.subscribe(`${session?.user?.id}`);

      channel.bind('denied', function(data:any) {
        console.log("data",data)
        setOfferMessage(data?.message)
        setIsCustomer("denied")
        setIsNotification(true);
        showBrowserNotification(
          "Teklifin Reddedildi :(",
          data?.message,
          `/panel/teklifler` // burada yönlendirme linkini dinamikleştir
        );
        playSound('/sounds/notify.mp3');
      });

    return () => {
      // React bileşen unmount edildiğinde burada temizleme işlemini yapabilirsiniz
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, [session]);

  return (
    <>
    <nav className="justify-between items-center w-full flex dark:bg-[#0a0d113b] bg-white p-3">

    <div>
      <div className=" items-center relative max-md:flex hidden">
        <Logo/>
      </div>
      <div className="text-xl pl-3 max-md:hidden">{
      pathname === '/panel/teklifler' 
      ? `${session?.user?.firmStatus ? "Teklif Verdiklerim" : "Teklifler"}` 
      : pathname === '/panel/ilanlar' ? <>{session?.user?.firmStatus === true ? "İlanlar" 
        : <div className="flex items-center w-fit rounded-full border dark:border-white/30 border-black/30 p-1 gap-x-2">
          <div onClick={() => setGigCreate(false)} className={gigCreate ? "px-3 py-1 border dark:border-white/30 border-black/30 whitespace-nowrap rounded-full cursor-pointer dark:text-white/30 text-black/70 dark:hover:bg-white/20 hover:bg-black/20 font-bold" : "px-3 py-1 border dark:border-white/30 border-black/30 whitespace-nowrap rounded-full dark:bg-white dark:text-black bg-black text-white cursor-pointer font-bold"}>İlanlar</div>
          <div onClick={() => setGigCreate(true)} className={gigCreate ? "px-3 py-1 border dark:border-white/30 border-black/30 whitespace-nowrap rounded-full dark:bg-white dark:text-black bg-black text-white cursor-pointer font-bold" : "px-3 py-1 border dark:border-white/30 border-black/30 whitespace-nowrap rounded-full cursor-pointer dark:text-white/30 text-black/70 font-bold dark:hover:bg-white/20 hover:bg-black/20"}>İlan Ekle</div></div>}</> 
      : pathname === '/panel/mesajlar' ? "Mesajlar" : null}
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
        <div className="dark:text-[#0a0d11] text-white hidden">{session?.user?.firmStatus !== true && isCustomer === 'user' ? toast(offerMessage,{icon:<Bell/>}) : isCustomer === 'offerUpdate' ? toast(offerMessage,{icon:<Bell/>}) : null}</div>
        <span className={session?.user?.firmStatus !== true && 
          isCustomer === 'user' ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" 
          : isCustomer === 'offerUpdate' ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" 
          : isCustomer === 'comment' ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" 
          : isCustomer === 'denied' ? "absolute size-4 rounded-full bg-amber-500 text-amber-950 -top-1 -right-1 text-xs flex justify-center items-center font-bold" 
          : "hidden"}>{toast?.length - 1}</span>
        </>
        }
        </div>
      </Tippy>
      <Tippy content={"Yardım"}><Link title="Yardım" href={`/yardim`}><CircleHelp size={23} className={pathname.startsWith(`/yardim`) ? "text-teal-300 transition-all max-md:hidden block" : "text-neutral-500 dark:hover:text-white hover:text-black transition-all max-md:hidden block"} /></Link></Tippy>
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

export default DashboardNavbar;
