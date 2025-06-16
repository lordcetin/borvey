/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { DirectMessage } from '@prisma/client';

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url)

    let cursor:any = searchParams.get('cursor');
    let conversationId = searchParams.get('conversationId');

    let messages: DirectMessage[] = [];

    if(cursor){
      messages = await prismadb.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor:{
          id:cursor,
        },
        where:{
          conversationId: conversationId as string,
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
      messages = await prismadb.directMessage.findMany({
        take: MESSAGES_BATCH,
        where:{
          conversationId: conversationId as string
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
    console.error("[DIRECT_MESSAGES_GET]",error)
    return NextResponse.json("Internal Error",{status:500})
  }
}