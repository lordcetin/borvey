/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import Pusher from 'pusher'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const offerId:any = formData.get('offerId')
    const status:any = formData.get('status')

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
      include:{
        gig:{
          include:{
            profiles:true
          }
        },
        profiles:true,
      },
      data:{
        status
      }
    })

    pusher.trigger(`${offer?.profileId}`, "offerUpdate", {
      message: `${offer?.gig?.profiles?.fullName} ${status === 'pending' ? "teklifi kabul etti" : status === 'success' ? "süreci tamamladı" : null}.`,
      sendTo: "offerUpdate"
    });

    const notification = await prismadb.notification.create({
      data:{
        gigId:offer?.gig?.id,
        senderId:offer?.gig?.profileId,
        senderImage:offer?.gig?.profiles?.image,
        senderName:offer?.gig?.profiles?.fullName,
        text:`${status === 'pending' ? "teklifini kabul etti" : status === 'success' ? "nakliye sürecini tamamladı" : ""}.`,
        profileId:offer?.profileId,
        createdAt:new Date()
      }
    });


    return NextResponse.json(offer,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}