/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    const searchParams: any = req.nextUrl.searchParams;
    const offeredUserId = searchParams.get('offeredUserId');

    const user = await prismadb.user.findUnique({ 
      where: { 
        id: offeredUserId 
      },
      include:{
        offers:true,
        gigs:{
          include:{
            offers:true
          }
        },
      }
    })
    return NextResponse.json(user,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}