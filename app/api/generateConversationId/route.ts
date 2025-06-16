/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse} from 'next/server';
import prismadb from '@/lib/prismadb';
import { getOrCreateConversation } from '@/lib/conversation';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const profileId  = data.profileId as string;
    const session:any = await auth()

    const otherPramsMember:any = await prismadb.user.findUnique({
      where:{
        id:profileId
      },
      include:{
        members:true
      }
    })

    const conversation = await getOrCreateConversation( session?.user?.memberId , otherPramsMember?.memberId )

    return NextResponse.json(conversation?.id,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}