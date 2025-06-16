/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { Message } from '@prisma/client';
import { auth } from '@/auth';

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)

    const session = await auth();
    const userId = session?.user?.id;

    const cursor = searchParams.get('cursor');
    const channelId = searchParams.get('channelId');
    
    let messages: Message[] = [];

    if(cursor){
      messages = await prismadb.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor:{
          id:cursor,
        },
        where:{
          channelId: channelId as string,
        },
        include:{
          member:{
            include:{
              profile:true
            }
          }
        },
        orderBy:{
          createdAt: "desc"
        }
      })
    }else{
      messages = await prismadb.message.findMany({
        take: MESSAGES_BATCH,
        where:{
          channelId: channelId as string
        },
        include:{
          member:{
            include:{
              profile:true
            }
          }
        },
        orderBy:{
          createdAt: "desc"
        }
      })
    }

    let nextCursor = null;

    if(messages.length === MESSAGES_BATCH){
      nextCursor = messages[MESSAGES_BATCH - 1].id
    }

    return NextResponse.json({
      items:messages,
      nextCursor
    },{status:200})

  } catch (error) {
    console.log("[MESSAGES_GET]",error)
    return NextResponse.json("Internal Error",{status:500})
  }
}