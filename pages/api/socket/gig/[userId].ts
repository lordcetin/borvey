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
   
    const { description,districtFrom,districtTo,provinceFrom,provinceTo,service,title,transportype } = req.query;
    const { content } = req.body;


    const session:any = await auth();
    const profileId:any = session?.user?.id

    const ilan = await prismadb.gig.create({
      data:{
        title: String(title),
        description: String(description),
        districtFrom: String(districtFrom),
        districtTo: String(districtTo),
        provinceFrom: String(provinceFrom),
        provinceTo: String(provinceTo),
        service: String(service),
        transportype: String(transportype),
        profileId: String(profileId),
        createdAt: new Date()
      }
    })

    const updateKey = `ilan:${session?.user?.id}:gig:update`;

    res?.socket?.server?.io?.emit(updateKey, ilan)

    return res.status(200).json(ilan)

  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal Error"})
  }

}