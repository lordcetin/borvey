/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const email:any = formData.get('email')
    const fullName:any = formData.get('fullName')
    const phone:any = formData.get('phone')
    const message:any = formData.get('message')

    const contact = await prismadb.contact.create({
      data:{
        email,
        fullName,
        phone: phone || '',
        message,
        createdAt: new Date()
      }
    })

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}