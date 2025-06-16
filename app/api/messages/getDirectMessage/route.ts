/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    const searchParams: any = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    const directM:any = await prismadb.directMessage.findMany({
      where:{
        conversationId:id
      }
    })
    
    return NextResponse.json(directM,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}