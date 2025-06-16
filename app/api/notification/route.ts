/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    const notification = await prismadb.notification.findMany({
      where:{
        OR:[
          {senderId:session?.user?.id},
          {profileId:session?.user?.id},
        ]
      },
      include:{
        profile:true
      }
    });
    
    return NextResponse.json(notification,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}