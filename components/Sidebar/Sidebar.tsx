/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from "next/image";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import Pusher from 'pusher-js';
import useNotification from "@/store/useNotification";
import useIsNotification from "@/store/useIsNotification";
import useSendTo from "@/store/useSendTo";
import useOfferMessage from "@/store/useOfferMessage";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { Grid2x2Plus, LayoutGrid, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { playSound } from '@/lib/playSound';
import { isEmpty } from "lodash";

type Props = {};
const DATE_FORMAT = 'd.MM.yyyy HH:mm';

const Sidebar = (props: Props) => {
  const {data:session}:any = useSession()
  const [screenHeight, setScreenHeight] = useState<any>(0);
  const [screenWidth, setScreenWidth] = useState<any>(0);
  const [message,setMessage] = useState([]);
  const [messages, setMessages] = useState(false)
  const [notification, setNotification] = useState(false)
  const [settings, setSettings] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [over, setOver] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const { openNotification,setOpenNotification } = useNotification()
  const { isNotification , setIsNotification } = useIsNotification()
  const { isCustomer , setIsCustomer } = useSendTo()
  const { offerMessage,setOfferMessage } = useOfferMessage()
  const { conversationId,setConversationId } = useAppContext()

  useLayoutEffect(() => {
    const pusher = new Pusher(`0c239ee8bc9e9da59c87`, {
      cluster: 'eu'
    });
      const channel:any = pusher.subscribe(`${session?.user?.id}`);

      channel.bind('chat', function(data:any) {
        setOfferMessage(data?.message)
        setConversationId(data?.conversationId)
        if(data?.sendTo === 'service'){
          if(!pathname?.startsWith('/panel/mesajlar')){
            if(!isEmpty(data?.message)){
              playSound('/sounds/notify.mp3');
              toast(data?.message , {descriptionClassName: "w-50 truncate flex items-center" , description: data?.messageContent , action:{label:"Mesajı Gör",onClick() { router?.push(`/panel/mesajlar/${conversationId}`) }},icon:<Image src={data?.avatar} alt={data?.message} width={800} height={800} className="object-cover size-6 rounded-full shrink-0 whitespace-nowrap self-start box-content border dark:border-white/30 border-black/30"/>})
            }
          }
          setIsCustomer(data?.sendTo)
        }
        setIsNotification(true);
        

      });

    return () => {
      pusher.unsubscribe(channel);
      pusher.disconnect();
    };
  }, [session]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenHeight(window?.innerHeight);
      setScreenWidth(window?.innerWidth);
    };

    // Set initial screen height
    setScreenHeight(window?.innerHeight);
    setScreenWidth(window?.innerWidth);

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menu:any[] = [
    {title:`${session?.user?.firmStatus === true ? 'Tekliflerim': 'Teklifler'}`,link:`/panel/teklifler`,icon:<LayoutGrid />},
    {title:`${session?.user?.firmStatus === true ? 'İlanlar' : 'İlanlarım'}`,link:`/panel/ilanlar`,icon:<Grid2x2Plus />},
    {title:'Mesajlar',link:`/panel/mesajlar`,icon:<MessageSquare />},
  ]


  return (
    <>
    <aside className={`dark:border-neutral-800 border-black/20 w-[250px] no-scrollbar z-[999999] box-content transition-all duration-300 no-scrollbar max-md:hidden`}>
    <div className="relative min-h-screen dark:bg-[#0a0d11] bg-white w-[250px] box-content transition-all duration-300 no-scrollbar top-0 left-0">
    <div className="p-2 transition-all h-[75px] items-center flex dark:bg-[#0a0d11] bg-white pl-7">

      <div className="flex items-center relative">
        <Link title="Anasayfa" href='/' className="flex items-center relative gap-x-1">
        <Image src={theme === 'light' ? '/borvey.png' : '/assets/logo-white.png'} width={800} height={800} alt="Borvey Logo" className="w-36 object-cover cursor-pointer"/>
        </Link>
      </div>
    </div>

    <nav className="overflow-y-auto no-scrollbar h-[calc(100%-75px)] relative overflow-x-hidden left-2">
    
      <div className="px-4 text-md">
        <ul className="my-2 py-2 space-y-8 list-none">
          {menu?.map((item:any,index:any) => {
            return (
              <Fragment key={index}>
              <li key={index}>

                <div onClick={() => {router?.push(item?.link),setIsNotification(false)}} className={`${pathname?.startsWith(item?.link) ? "transition-all my-2 flex items-center gap-x-2 capitalize hover:text-brand cursor-pointer pr-[4px] group/item text-neutral-500 hover:text-amber-400 overflow-hidden bg-amber-500 rounded-lg" : "transition-all my-2 flex items-center gap-x-2 capitalize hover:text-brand cursor-pointer pr-[4px] group/item text-neutral-500 hover:text-amber-400 overflow-hidden"} `}>
                  
                  <div className={pathname?.startsWith(item?.link) ? "grid w-[38px] h-[38px] place-content-center rounded-md text-white text-2xl relative" : "grid w-[38px] h-[38px]  place-content-center rounded-md text-neutral-500 group-hover/item:text-amber-500 text-2xl relative"}>
                  {isNotification && <><span className={!pathname?.startsWith('/panel/mesajlar') && index === 2 && isCustomer === 'service' ? "absolute size-3 animate-pulse rounded-full bg-amber-500 text-amber-950 top-1 right-1 text-xs flex justify-center items-center font-bold" : "hidden"}></span></>}
                  {item?.icon}
                  </div>

                  <div className={pathname?.startsWith(item?.link) ? `flex-1 whitespace-nowrap ml-4 text-white` : "flex-1  whitespace-nowrap ml-4 text-neutral-500 group-hover/item:text-amber-500  "}>{item?.title}</div>

                </div>
              </li>
              </Fragment>
            )
          })}

        </ul>

      </div>

    </nav>

    </div>
    </aside>
    </>
  );
};

export default Sidebar;
