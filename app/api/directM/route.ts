/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const datas = await req.json();
    const id  = datas.id as string;

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