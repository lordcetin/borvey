/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb'
import Pusher from 'pusher'
import { auth } from "@/auth";

export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
  if(req.method !== "POST"){
    return res.status(405).json({error:"Method not allowed"})
  }
  try {

    const { content, fileUrl } = req.body;
    const { userId,conversationId } = req.query;

    const conversation:any = await prismadb.conversation.findFirst({
      where:{
       id:conversationId as string,
       OR: [
        {
          memberOne:{
            profileId: userId as string
          }
        },
        {
          memberTwo:{
            profileId: userId as string
          }
        }
       ]
      },
      include:{
        memberOne:{
          include:{
            profile:true
          }
        },
        memberTwo:{
          include:{
            profile:true
          }
        }
      }
    })


    const member = conversation?.memberOne?.profileId === userId ?
    conversation?.memberOne : conversation?.memberTwo

    const message = await prismadb.directMessage.create({
      data:{
        content,
        fileUrl,
        inspect: "safe",
        conversationId: conversationId as string,
        memberId: member?.id as string,
      },
      include:{
        member:{
          include:{
            profile:true
          }
        }
      }
    })

    await prismadb.conversation.update({
      where:{
        id: conversationId as string
      },
      data:{
        lastMessageId: message?.id,
        lastMessage: content,
        lastMessageFileUrl: fileUrl,
        lastMessageCreatedAt: new Date(),
        lastMessageInspect: "safe",
        lastMessageSenderId: member?.id,
      }
    })

    const conversationKey = `chat:${conversationId}:messages`;
    res?.socket?.server?.io?.emit(conversationKey,message)

    return res.status(200).json(message)

  } catch (error) {
    console.error("[DIRECT_MESSAGES_POST]",error)
    return res.status(500).json({message:"Internal Error"})
  }
}