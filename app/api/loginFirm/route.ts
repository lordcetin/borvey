/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import prismadb from '@/lib/prismadb';
import bcrypt from "bcryptjs";
import axios from "axios";
import { uid } from "uid";
import { randomBytes, scryptSync } from "crypto";
import { hashPassword } from "@/lib/solveScrypt";

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fullName:any = formData.get('fullName')
  const firmName:any = formData.get('firmName')
  const code:any = formData.get('code')
  const firmPhone:any = formData.get('firmPhone')
  const firmDescription:any = formData.get('firmDescription')
  const email:any = formData.get('email')
  const password:any = formData.get('password')
  const images = formData.getAll("file") as File[];

  if (!images.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  const uuid = uid(16);

  const relativeUploadDir = `/uploads/${uuid}-${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while creating directory", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
  }

  try {
    const fileUrls: string[] = [];

    for (const image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      const filePath = `${uploadDir}/${filename}`;

      await writeFile(filePath, buffer);
      fileUrls.push(`${relativeUploadDir}/${filename}`);
    }

    if(process.env.NODE_ENV === 'production'){
      
    const userIP = 
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')
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

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    
    const user = await prismadb.user.create({
      data: {
        email,
        phone:firmPhone,
        fullName,
        hashedPassword,
        memberId:"",
        code,
        expires: expirationDate,
        image: fileUrls[0],
        firmName,
        firmStatus:true,
        emailVerified: new Date(),
        createdAt: new Date(),
        updated: new Date()
      }
    });

    const server = await prismadb.server.create({
      data:{
        name:fullName.toLowerCase().trim(),
        image:fileUrls[0],
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

    const firm = await prismadb.firm.create({
      data:{
        firmName,
        firmLogo:fileUrls[0],
        firmDescription,
        firmPhone,
        profileId:user?.id,
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
          phone:firmPhone,
          hashedPassword,
          memberId:"",
          code,
          expires: expirationDate,
          image: fileUrls[0],
          firmName,
          firmStatus:true,
          emailVerified: new Date(),
          updated: new Date(),
          createdAt: new Date(),
        }
      });

      const server = await prismadb.server.create({
        data:{
          name:fullName.toLowerCase().trim(),
          image:fileUrls[0],
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

    const firm = await prismadb.firm.create({
      data:{
        firmName,
        firmLogo:fileUrls[0],
        firmDescription,
        firmPhone,
        profileId:user?.id,
        createdAt: new Date()
      }
    })

      return NextResponse.json("Successfull",{status:200})
    }

  } catch (e) {
    console.error("Error while uploading files", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
