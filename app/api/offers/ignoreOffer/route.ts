/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import Pusher from 'pusher'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const gigId:any = formData.get('gigId')
    const offerId:any = formData.get('offerId')

    const pusher = new Pusher({
      appId: "2001759",
      key: "0c239ee8bc9e9da59c87",
      secret: "f3ba0fdd59a88adb54f8",
      cluster: "eu",
      useTLS: true
    });

    const offer = await prismadb.offers.update({
      where:{
        id:offerId
      },
      data:{
        status:"denied"
      },
      include:{
        profiles:true,
        gig:true
      }
    })

    pusher.trigger(`${offer?.profiles?.id}`, "denied", {
      message: `${offer?.profiles?.fullName} teklifini reddetti.`,
      sendTo: "denied"
    });

    const notification = await prismadb.notification.create({
      data:{
        text:"teklifini reddetti.",
        senderId: String(offer?.profiles?.id),
        senderName: String(offer?.profiles?.fullName),
        senderImage: String(offer?.profiles?.image),
        profileId: String(offer?.profileId),
        gigId: String(gigId),
        createdAt: new Date()
      }
    })

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}