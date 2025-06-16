/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'
import { auth, signIn } from '@/auth';
import prismadb from '@/lib/prismadb';
import { isEmpty } from 'lodash';

export const getOrCreateConversation = async (memberOneId:any, memberTwoId:any) => {
  try {

    let conversation:any = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId)

    if(isEmpty(conversation)){
      conversation = await createNewConversation(memberOneId,memberTwoId)
    }

    return conversation;
    
  } catch (error) {
    console.log("ERROR",error)
  }
}

const findConversation = async (memberOneId:any, memberTwoId:any) => {
  try {

  return await prismadb.conversation.findFirst({
    where:{
      AND:[
        { memberOneId: memberOneId },
        { memberTwoId: memberTwoId },
      ]
    },
    include:{
      memberOne:{
        include:{
          profile: true,
        }
      },
      memberTwo:{
        include:{
          profile: true,
        }
      }
    }
  })

  } catch(error) {
    console.log("error",error)
    return null;
  }
}

const createNewConversation = async (memberOneId:any,memberTwoId:any) => {
  try {
    if (!memberOneId || !memberTwoId) {
      throw new Error("Invalid member IDs. Both memberOneId and memberTwoId are required.");
    }

     const conversation = await prismadb.conversation.create({
      data:{
        memberOneId:String(memberOneId),
        memberTwoId:String(memberTwoId),
        lastMessageId: "",
        lastMessage: "",
        lastMessageFileUrl: "",
        lastMessageCreatedAt: new Date(),
        lastMessageInspect: "safe",
        lastMessageSenderId: ""
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

    const userOne = await prismadb.user.update({
      where:{
        id:conversation?.memberOne?.profileId
      },
      data:{
        conversationId:conversation?.id
      }
    })

    const userTwo = await prismadb.user.update({
      where:{
        id:conversation?.memberTwo?.profileId
      },
      data:{
        conversationId:conversation?.id
      }
    })
    
    return conversation

  } catch (error) {
    console.log("error",error)
    return null;
  }
}