/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const id:any = formData.get('id')
    const firmName:any = formData.get('firmName')
    const description:any = formData.get('description')
    const image:any = formData.get('image')

    await prismadb.spotlight.create({
      data:{
        id,
        firmName,
        description,
        image,
        createdAt: new Date()
      }
    })

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}