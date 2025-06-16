/* eslint-disable @typescript-eslint/no-explicit-any */
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prismadb from '@/lib/prismadb'
import { uid } from "uid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const session:any = await auth()
  const uuid = uid(16);
  const image = formData.get("image") as File || null;

  const buffer = Buffer.from(await image.arrayBuffer());
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
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong.1" },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Save to database
    await prismadb.user.update({
      where:{
        id:session?.user?.id
      },
      data:{
        image:fileUrl
      }
    });

    return NextResponse.json(fileUrl,{status:200});
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong.2" },
      { status: 500 }
    );
  }
}