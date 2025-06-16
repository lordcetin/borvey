/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcryptjs';
import { isEmpty } from 'lodash';
import { randomBytes, scryptSync } from 'crypto';
import { hashPassword } from '@/lib/solveScrypt';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const datas = await request.json();
    const userId = datas.userId as string;
    const fullName  = datas.fullName as string;
    const firmName  = datas.firmName as string;
    const email  = datas.email as string;
    const password  = datas.password as string;

    const usr = await prismadb.user.findUnique({
      where:{
        id:userId
      }
    })

    if(!isEmpty(password)){

      // const { salt, hash } = await hashPassword(password);
    const hashedPassword = await bcrypt.hash(password, 12);
    // const salt = randomBytes(16).toString("hex");
    // const hashedPassword:any = (password:any) => scryptSync(password, salt, 32).toString("hex")

    await prismadb.user.update({
      where:{
        id:userId
      },
      data:{
        fullName: fullName || usr?.fullName,
        firmName: firmName || usr?.firmName,
        email: email || usr?.email,
        hashedPassword
      } 
    })

    }else{
    const user = await prismadb.user.update({
      where:{
        id:userId
      },
      data:{
        fullName: fullName || usr?.fullName,
        firmName: firmName || usr?.firmName,
        email: email || usr?.email,
      } 
    })
    return NextResponse.json(user,{status:200})
    }

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}