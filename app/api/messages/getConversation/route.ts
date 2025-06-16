/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    // const searchParams: any = req.nextUrl.searchParams;
    // const param = searchParams.get('param');
    
    const session:any = await auth()

    const currentMember = await prismadb.member.findFirst({
      where:{
        profileId:session?.user?.id
      },
      include:{
        profile:true
      }
    })
  
    // const conversations = await prismadb.conversation.findMany()
    // console.log("conversations",conversations)
  
    const conversations:any = await prismadb.conversation.findMany({
      where:{
        OR:[
          {memberOneId:currentMember?.id},
          {memberTwoId:currentMember?.id}
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

    return NextResponse.json(conversations,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}