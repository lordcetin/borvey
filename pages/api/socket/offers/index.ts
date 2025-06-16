
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb'
import { auth } from "@/auth";

export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
  if(req.method !== "POST"){
    return res.status(405).json({error:"Method not allowed"})
  }
  try {
    const session = await auth()

    const offer = await prismadb.offers.findMany({
      where:{
        OR:[
          {offeredUserId:session?.user?.id},
          {profileId:session?.user?.id},
        ]
      },
      include:{
        gig:true,
        profiles:true
      }
    });

    const offerKey = `ilan:${session?.user?.id}:offers`;
    res?.socket?.server?.io?.emit(offerKey,offer)

    return res.status(200).json(offer)

  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]",error)
    return res.status(500).json({message:"Internal Error"})
  }
}