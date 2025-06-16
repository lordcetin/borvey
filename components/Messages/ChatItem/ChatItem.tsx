/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Member, MemberRole } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Tippy from '@tippyjs/react';
import { File, ShieldCheck, ShieldUser } from 'lucide-react';
import { useRouter } from 'next/navigation';


type Props = {
  id:string;
  content: any;
  inspect:any;
  member: any & {
    Profile: any;
  };
  timestamp: any;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap:any = {
  "GUEST": null,
  "ADMIN" : <ShieldCheck className='size-4 text-indigo-600'/>,
  "MODERATOR" : <ShieldUser className='size-4 text-rose-600'/>
}

const ChatIem = ({id,content,inspect,member,timestamp,fileUrl,deleted,currentMember,isUpdated,socketUrl,socketQuery}: Props) => {
  const {data:session}:any = useSession()
  const [isEditing,setIsEditing] = useState(false);
  const [deleting,setIsDeleting] = useState(false);
  const fileType = fileUrl?.split(".").pop();
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member?.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;
  const router = useRouter()

  const onMemberClick = () => {
    if(member?.id === currentMember?.id){
      // return;
      router.push(`/profile/${member?.profile?.id}`)
    }
    router.push(`/profile/${member?.profile?.id}`)
  }

  return (
  <div className={member?.profile?.id === session?.user?.id ? 'flex items-center w-fit max-w-[500px] max-md:max-w-72 whitespace-pre-wrap gap-x-3 transition-all p-1 rounded relative group' : 'flex justify-end self-end items-center w-fit max-w-[500px] max-md:max-w-72 whitespace-pre-wrap gap-x-3 transition-all p-1 rounded relative group'}>
    <div className={`flex items-center py-1 pr-4 pl-2 rounded-lg gap-x-2 relative ${inspect === 'fraud' ? "border border-red-500/40 hover:border-red-500" : ""}`}>
    {inspect === 'fraud' ? <Tippy content={inspect === 'fraud' ? "Dolandırıcılık" : inspect === 'crime' ? "Suç/İllegal" : inspect === "insult" ? "Hakaret" : ""}><span className='bg-red-500 rounded-full size-6 text-sm font-semibold absolute -right-2 -top-3 flex items-center justify-center cursor-pointer'>!</span></Tippy> : null}
    <Image onClick={onMemberClick} src={member?.profile?.image} alt='' width={800} height={800} className='size-[40px] rounded-full object-cover self-start cursor-pointer'/>
    <div>
      <div className='flex items-center gap-x-2'><h1 onClick={onMemberClick} className={`${member?.profile?.id === session?.user?.id ? "text-amber-500" : "text-sky-500"}   text-md hover:underline cursor-pointer`}>{member?.profile?.fullName}</h1>{roleIconMap[member?.role]}<span className='text-xs text-neutral-600'>{timestamp}</span></div>
      
      <p className={`text-sm ${inspect === 'fraud' || inspect === 'crime' || inspect === 'insult' ? "line-through text-white/15" : ""}`}>{content}</p>
      {isImage && (
        <Image src={fileUrl} alt='' width={800} height={800} className='object-cover w-full h-[282px]'/>
      )}
      {isPDF && (
        <div className='w-full h-[282px]'>
          <File />
        </div>
      )}
      {!fileUrl && !isEditing && (
        <p className={cn(
          "text-xs",
          deleted && "italic text-neutral-600 mt-1"
        )}>
          
          {isUpdated && !deleted && (
            <span className='text-[10px] mx-2 text-neutral-600'>
              (edited)
            </span>
          )}
        </p>
      )}
    </div>
    
    </div>
  </div>
  )
}

export default ChatIem