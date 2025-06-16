/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const title:any = formData.get('title')
    const description:any = formData.get('description')
    const districtFrom:any = formData.get('districtFrom')
    const districtTo:any = formData.get('districtTo')
    const provinceFrom:any = formData.get('provinceFrom')
    const provinceTo:any = formData.get('provinceTo')
    const service:any = formData.get('service')
    const transportype:any = formData.get('transportype')
    
    const session = await auth()
    const profileId = session?.user?.id

    const ilan = await prismadb.gig.create({
      data:{
        title: String(title),
        description: String(description),
        districtFrom: String(districtFrom),
        districtTo: String(districtTo),
        provinceFrom: String(provinceFrom),
        provinceTo: String(provinceTo),
        service: String(service),
        transportype: String(transportype),
        profileId: String(profileId),
        createdAt: new Date()
      }
    });

    return NextResponse.json(ilan,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}