/* eslint-disable @typescript-eslint/no-explicit-any */
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { uid } from 'uid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const images = formData.getAll("images") as File[];
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

    return NextResponse.json(fileUrls, { status: 200 });
  } catch (e) {
    console.error("Error while uploading files", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
