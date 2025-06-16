/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import useComment from '@/store/useComment'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import StarRating from '../StarRating/StarRating'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type Props = {
  offers:any
}

const CommentCreate = ({offers}: Props) => {
  const router = useRouter();
  const { data:session } = useSession()
  const { commentCreate, setCommentCreate } = useComment()
  const offer = offers?.filter((u:any) => u?.profileId === session?.user?.id || u?.offeredUserId === session?.user?.id)?.map((invData:any) => invData )?.[0]
    const categories = [
      { name: "İletişim", stateKey: "communicationRate" },
      { name: "Hizmet", stateKey: "serviceRate" },
      { name: "Zamanlama", stateKey: "speedRate" },
    ];
  
    const initialRatings = {
      communicationRate: 0,
      serviceRate: 0,
      speedRate: 0,
    };
  
    const [ratings, setRatings] = useState<any>(initialRatings);
    const [hover, setHover] = useState<any>(initialRatings);
    const [loading,setLoading] = useState(false);
    const [text,setText] = useState("");
  
    const handleRating = (key:any, value:any) => {
      setRatings((prevRatings:any) => ({
        ...prevRatings,
        [key]: value,
      }));
    };
  
    const handleHover = (key:any, value:any) => {
      setHover((prevHover:any) => ({
        ...prevHover,
        [key]: value,
      }));
    };
  
    const handleMouseLeave = (key:any) => {
      setHover((prevHover:any) => ({
        ...prevHover,
        [key]: ratings[key],
      }));
    };

    const handleSubmit = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("gigId",offer?.gigId)
      formData.append("comment",text)
      formData.append("senderId",offer?.offeredUserId)
      formData.append("profileId",offer?.profileId)
      formData.append("speedRate",String(ratings?.speedRate))
      formData.append("serviceRate",String(ratings?.serviceRate))
      formData.append("communicationRate",String(ratings?.communicationRate))
      const { status } = await axios.post(`/api/comment/setComment`,formData)
      if(status === 200) {
        setCommentCreate(false)
        return router.refresh()
      }
      setLoading(false);
    }

  return (
    <>
    {commentCreate && 
    <div className='flex justify-center items-center w-full absolute bottom-0'>
    <motion.div
    initial={{ y: "100%", opacity: 0.3 }}
    animate={{ y: "0%", opacity: 1 }}
    exit={{ y: "-100%", opacity: 0.3 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1], // iOS benzeri easing
    }} 
    className='w-3/6 flex-col justify-center items-center dark:bg-brandDark bg-white border-t border-x dark:border-white/30 border-black/30 z-[99999] h-[30vw] rounded-t-3xl'>
      <div className='flex justify-between items-center w-full self-start p-3'>
        <h1 className='ml-2 text-2xl font-bold'>Yorum Yap</h1>
        <X onClick={() => setCommentCreate(false)} size={28} className='cursor-pointer dark:text-white/50 dark:hover:text-white text-black/50 hover:text-black'/>
      </div>
      <div className='flex-col flex items-center w-full mt-20'>
      <StarRating categories={categories} hover={hover} ratings={ratings} handleHover={handleHover} handleMouseLeave={handleMouseLeave} handleRating={handleRating} />
      <textarea onChange={(e:any) => setText(e?.target?.value)} className='min-h-20 max-h-52 border border-white/60 w-3/6 rounded-lg outline-none p-2 mt-10 mb-5' placeholder='Yorum Yap...'></textarea>
      <button 
      type='button' 
      onClick={() => handleSubmit()} 
      className='w-3/6 py-2 bg-amber-500 hover:bg-amber-600 transition-all text-amber-950 font-bold cursor-pointer rounded-lg'>Yorumu Gönder</button>
      </div>
    </motion.div>
    </div>
    }
    </>
  )
}

export default CommentCreate