/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb'
import { MemberRole } from "@prisma/client";
import { auth } from "@/auth";

export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
  
  if(req.method !== "DELETE" && req.method !== "PATCH"){
    return res.status(405).json({error:"Method not allowed"})
  }
  try {
   
    const { offerText,price,time,gigId,offeredUserId } = req.query;
    const { content } = req.body;


    const session:any = await auth();
    const profileId:any = session?.user?.id

    const user = await prismadb.user.findUnique({
      where:{
        id:profileId
      },
      include:{
        firm:true
      }
    })

    const firmId = user?.firm?.[0].id


    const offer = await prismadb.offers.create({
      data:{
        firmId:String(firmId),
        offerText:String(offerText),
        price:String(price),
        time:String(time),
        gigId:String(gigId),
        offeredUserId:String(offeredUserId),
        profileId:String(profileId),
        createdAt: new Date(),
      }
    })

    const profile = await prismadb.user.findUnique({
      where:{
        id:session?.user?.id
      }
    })

    const notification = await prismadb.notification.create({
      data:{
        text:"ilanına bir teklif gönderdi.",
        senderId: String(profile?.id),
        senderName: String(profile?.firmName),
        senderImage: String(profile?.image),
        profileId: String(offeredUserId),
        gigId: String(gigId),
        createdAt: new Date()
      }
    })

    const updateKey = `ilan:${session?.user?.id}:offers:update`;

    res?.socket?.server?.io?.emit(updateKey, offer)

    return res.status(200).json(offer)

  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal Error"})
  }

}