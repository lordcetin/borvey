/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

  const offer = await prismadb.offers.findMany({
    where:{
      OR:[
        {offeredUserId:session?.user?.id},
        {profileId:session?.user?.id},
      ]
    },
    include:{
      gig:true,
      profiles:true
    }
  });
    
    return NextResponse.json(offer,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}