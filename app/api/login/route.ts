/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import axios from "axios";
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {

  try {

    const datas = await request.json();
    const fullName  = datas.fullName as string;
    const email  = datas.email as string;
    const password  = datas.password as string;
    const service  = datas.service as string;
    const transportype = datas.transportype as string;
    const title = datas.title as string;
    const description = datas.description as string;
    const provinceFrom = datas.provinceFrom as string;
    const provinceTo = datas.provinceTo as string;
    const districtFrom = datas.districtFrom as string;
    const districtTo = datas.districtTo as string;
    const code = datas.code as string;

    if(process.env.NODE_ENV === 'production'){
      
    const userIP = 
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')
    // req.socket.remoteAddress || '';

    const ipconf = await axios.get(`https://ipinfo.io/${userIP}?token=${process.env.IPINFO_API_KEY}`);
    const ipconfig = ipconf.data;

    // const { salt, hash }:any = await hashPassword(password);
    const hashedPassword = await bcrypt.hash(password, 12);
    // const salt = randomBytes(16).toString("hex");
    // const hashedPassword:any = (password:any) => scryptSync(password, salt, 32).toString("hex")


    let ip = ipconfig.ip || '';
    let city = ipconfig.city || '';
    let region = ipconfig.region || '';
    let country = ipconfig.country || '';
    let postal = ipconfig.postal || '';
    let timezone = ipconfig.timezone || '';
    let location = ipconfig.loc || '';

    console.log("data",datas)

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    
    const user = await prismadb.user.create({
      data: {
        email,
        fullName,
        hashedPassword,
        memberId:"",
        provinceFrom,
        districtFrom,
        code,
        expires: expirationDate,
        image: "/avatar.png",
        emailVerified: new Date(),
        createdAt: new Date(),
        updated: new Date()
      }
    });

    const server = await prismadb.server.create({
      data:{
        name:fullName.toLowerCase().trim(),
        image:"/avatar.png",
        profileId:user?.id,
      }
    })

    const member = await prismadb.member.create({
      data:{
        serverId:server?.id,
        profileId:user?.id,
        createdAt: new Date(),
        updateAt: new Date()
      }
    })

    await prismadb.user.update({
      where:{
        id:member?.profileId
      },
      data:{
        memberId:member?.id
      }
    })

    const session = await prismadb.session.create({
        data: {
          sessionToken: Math.random().toString(36).substring(2) + Date.now(),
          profileId:String(user?.id),
          fullName,
          memberId:member?.id,
          ip,
          city,
          region,
          country,
          postal,
          timezone,
          location,
          expires: expirationDate,
          createdAt: new Date()
        },
    });

    const gig = await prismadb.gig.create({
      data:{
        title,
        description,
        districtFrom,
        districtTo,
        provinceFrom,
        provinceTo,
        service,
        transportype,
        profileId: user?.id,
        createdAt: new Date()
      }
    })

    return NextResponse.json("Successfull",{status:200})

    }else{
      // const { salt, hash }:any = await hashPassword(password);
      const hashedPassword = await bcrypt.hash(password, 12);
      // const salt = randomBytes(16).toString("hex");
      // const hashedPassword:any = (password:any) => scryptSync(password, salt, 32).toString("hex")

      let ip = '';
      let city = '';
      let region = '';
      let country = '';
      let postal = '';
      let timezone = '';
      let location = '';

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      const user:any = await prismadb.user.create({
        data: {
          fullName,
          email,
          hashedPassword,
          memberId:"",
          provinceFrom,
          districtFrom,
          code,
          expires: expirationDate,
          image: "/avatar.png",
          emailVerified: new Date(),
          updated: new Date(),
          createdAt: new Date(),
        }
      });

      const server = await prismadb.server.create({
        data:{
          name:fullName.toLowerCase().trim(),
          image:"/avatar.png",
          profileId:user?.id,
        }
      })
  
      const member = await prismadb.member.create({
        data:{
          serverId:server?.id,
          profileId:user?.id,
          createdAt: new Date(),
          updateAt: new Date()
        }
      })

      await prismadb.user.update({
        where:{
          id:member?.profileId
        },
        data:{
          memberId:member?.id
        }
      })
    
    const session = await prismadb.session.create({
      data: {
        sessionToken: Math.random().toString(36).substring(2) + Date.now(),
        profileId:String(user?.id),
        fullName,
        memberId:member?.id,
        ip,
        city,
        region,
        country,
        postal,
        timezone,
        location,
        expires: expirationDate,
        createdAt: new Date()
      },
    });

    const gig = await prismadb.gig.create({
      data:{
        title,
        description,
        districtFrom,
        districtTo,
        provinceFrom,
        provinceTo,
        service,
        transportype,
        profileId: user?.id,
        createdAt: new Date()
      }
    })
    
      return NextResponse.json("Successfull",{status:200})
    }

  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json({error:JSON.stringify(error)},{status:500})
  }
}