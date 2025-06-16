/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import Pusher from "pusher";
import prismadb from '@/lib/prismadb'

type Props = {
  senderId:any;
  senderName:any;
  senderImage:any;
  conversationId:any;
  content:any;
}

export const sendNotification = async ({senderId,senderName,senderImage,conversationId,content}:Props) => {

    const pusher = new Pusher({
      appId: "2001759",
      key: "0c239ee8bc9e9da59c87",
      secret: "f3ba0fdd59a88adb54f8",
      cluster: "eu",
      useTLS: true
    });

    const conv = await prismadb.conversation.findUnique({
      where:{
        id:conversationId
      },
      include:{
        memberOne:true,
        memberTwo:true,
      }
    });

    pusher.trigger(`${senderId === conv?.memberOne?.profileId ? conv?.memberTwo?.profileId : conv?.memberOne?.profileId }`, "chat", {
      message: `${senderName}`,
      messageContent:content,
      conversationId:conversationId,
      avatar:senderImage,
      sendTo: "service"
    });

    // const notification = await prismadb.notification.create({
    //   data:{
    //     text:`${senderName} sana mesaj gönderdi.`,
    //     gigId:"",
    //     senderId,
    //     senderName,
    //     senderImage,
    //     profileId:String(session?.user?.id),
    //     createdAt: new Date()
    //   }
    // })
}