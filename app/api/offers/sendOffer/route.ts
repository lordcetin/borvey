/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import axios from 'axios';
import { auth } from '@/auth';
import Pusher from 'pusher'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const offerText:any = formData.get('offerText')
    const price:any = formData.get('price')
    const time:any = formData.get('time')
    const gigId:any = formData.get('gigId')
    const offeredUserId:any = formData.get('offeredUserId')
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

    const pusher = new Pusher({
      appId: "2001759",
      key: "0c239ee8bc9e9da59c87",
      secret: "f3ba0fdd59a88adb54f8",
      cluster: "eu",
      useTLS: true
    });

    const offer = await prismadb.offers.create({
      data:{
        offerText:String(offerText),
        price,
        firmId:String(user?.firm?.[0]?.id),
        time:String(time),
        gigId:String(gigId),
        offeredUserId,
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

    pusher.trigger(`${offeredUserId}`, "offer", {
      message: `${profile?.firmName} ilanına bir teklif gönderdi.`,
      sendTo: "user"
    });

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}