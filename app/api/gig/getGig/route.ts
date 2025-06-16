/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {

  const ilanlar = await prismadb.gig.findMany({
    include:{
      profiles:true,
      offers:{
        include:{
          profiles:true
        }
      }
    }
  })
    
    return NextResponse.json(ilanlar,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}