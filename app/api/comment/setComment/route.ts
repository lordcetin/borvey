/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';
import { updateGigLevel } from '@/utils/updateGigLevel';
import { calculateAverageStars } from '@/utils/calculateAverageStars';
import { updateFreelancerStats } from '@/utils/updateFreelancerStats';
import Pusher from 'pusher'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const session:any = await auth()

    const gigId:any = formData.get('gigId')
    const receiverId:any = formData.get('profileId')
    const comment:any = formData.get('comment')
    const senderId:any = formData.get('senderId')
    const speedRate:any = formData.get('speedRate')
    const serviceRate:any = formData.get('serviceRate')
    const communicationRate:any = formData.get('communicationRate')

    const pusher = new Pusher({
      appId: "2001759",
      key: "0c239ee8bc9e9da59c87",
      secret: "f3ba0fdd59a88adb54f8",
      cluster: "eu",
      useTLS: true
    });

    const user = await prismadb.user.findUnique({
      where:{
        id:receiverId
      },
      include:{
        firm:true
      }
    })

    const userSender = await prismadb.user.findUnique({
      where:{
        id:senderId
      }
    })

    const firmId:any = user?.firm?.[0]?.id


    await prismadb.comments.create({
      data:{
        comment,
        speedRate,
        serviceRate,
        communicationRate,
        profileId:firmId,
        gigId,
        senderId,
        createdAt: new Date()
      }
    })
      // Ortalama hesaplama fonksiyonu
      const averageStars = await calculateAverageStars(firmId);

      const firm = await prismadb.firm.update({
        where: { id: firmId },
        include:{
          offers:true
        },
        data: { stars: averageStars.toString() },
      });

      await updateGigLevel(firmId);
      await updateFreelancerStats(firmId, receiverId)

    pusher.trigger(`${receiverId}`, "comment", {
      message: `${userSender?.fullName} yorum yaptı.`,
      sendTo: "comment"
    });

    const notification = await prismadb.notification.create({
      data:{
        gigId:gigId,
        senderId:String(userSender?.id),
        senderImage:String(userSender?.image),
        senderName:String(userSender?.fullName),
        text:`yorum gönderdi.`,
        profileId:receiverId,
        createdAt:new Date()
      }
    });

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}