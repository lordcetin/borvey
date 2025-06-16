
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

    const ilanlar = await prismadb.gig.findMany({
      where:{
        profileId:session?.user?.id
      },
      include:{
        profiles:true,
        offers:{
          include:{
            profiles:true
          }
        }
      }
    })

    const offerKey = `ilan:${session?.user?.id}:gig`;
    res?.socket?.server?.io?.emit(offerKey,ilanlar)

    return res.status(200).json(ilanlar)

  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]",error)
    return res.status(500).json({message:"Internal Error"})
  }
}