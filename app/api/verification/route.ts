/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';
import { auth } from '@/auth';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const code:any = formData.get('code')
    const session = await auth()

    const existUser = await prismadb.user?.findUnique({where:{id:session?.user?.id}})

    if(existUser?.code === code){
      await prismadb.user?.update({
        where:{
          id:session?.user?.id
        },
        data:{
          verified:true
        }
      })
    }else{
      return NextResponse.json("Kod geçersiz ya da süresi doldu.",{status:400})
    }

    return NextResponse.json("Aktivasyon başarıyla tamamlandı.",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}