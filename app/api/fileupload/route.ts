import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2client";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file: File = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const putObjectCommand = new PutObjectCommand({
    Bucket: "mybucket",
    Key: file.name,
    Body: buffer,
  });

  try {
    const response = await r2.send(putObjectCommand);
    console.log("File uploaded successfully:", response);
    return NextResponse.json(
      { sucess: true, message: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ sucess: false }, { status: 500 });
  }
};

// read this https://medium.com/@xhowais/next-js-file-upload-api-tutorial-local-directroy-7ec039efbd66
// https://gist.github.com/agmm/da47a027f3d73870020a5102388dd820

export const PUT = async (req: NextRequest) => {
  console.log("🚀 ~ PUT ~ command hit");

  const formData = await req.formData();
  const file: File = formData.get("file") as File;
  const key = formData.get("filekey") as string;
  console.log("🚀 ~ PUT ~ key:", key);

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const putObjectCommand = new PutObjectCommand({
    Bucket: "mybucket",
    Key: key,
    Body: buffer,
  });

  try {
    const response = await r2.send(putObjectCommand);
    console.log("File uploaded successfully:", response);
    return NextResponse.json(
      { sucess: true, message: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ sucess: false }, { status: 500 });
  }
};
