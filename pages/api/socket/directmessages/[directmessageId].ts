
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb'
import { MemberRole } from "@prisma/client";

export default async function handler(req:NextApiRequest,res:NextApiResponseServerIo) {
  
  if(req.method !== "DELETE" && req.method !== "PATCH"){
    return res.status(405).json({error:"Method not allowed"})
  }
  try {
   
    const { userId,directmessageId,conversationId } = req.query;
    const { content } = req.body;

    const conversation = await prismadb.conversation.findFirst({
      where:{
        id:conversationId as string,
        OR:[
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
    conversation?.memberOne : conversation?.memberTwo;

    let directMessage = await prismadb.directMessage.findFirst({
      where:{
        id: directmessageId as string,
        conversationId: conversationId as string,
      },
      include:{
        member:{
          include:{
            profile:true
          }
        }
      }
    })

    const isMessageOwner = directMessage?.memberId === member?.id;
    const isAdmin = member?.role === MemberRole.ADMIN;
    const isModerator = member?.role === MemberRole.MODERATOR;

    const canModify = isMessageOwner || isAdmin || isModerator;

    if(req.method === "DELETE"){
      directMessage = await prismadb.directMessage.update({
        where:{
          id: directmessageId as string,
        },
        data:{
          fileUrl:null,
          content: "This message has been deleted.",
          deleted:true,
        },
        include:{
          member:{
            include:{
              profile:true
            }
          }
        }
      })
    }

    if(req.method === "PATCH"){
      directMessage = await prismadb.directMessage.update({
        where:{
          id: directmessageId as string,
        },
        data:{
          content,
        },
        include:{
          member:{
            include:{
              profile:true
            }
          }
        }
      })
    }

    const updateKey = `chat:${conversationId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage)

    return res.status(200).json(directMessage)

  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal Error"})
  }

}