import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const r3 = new S3Client({
  region: "auto",
  endpoint: process.env.endpoint ?? "",
  credentials: {
    accessKeyId: process.env.accessKeyId ?? "",
    secretAccessKey: process.env.secretAccessKey ?? "",
  },
});

export const GET = async (req: NextRequest) => {
  const fileName = new Date().toString() + ".png";
  const fileContent = fs.readFileSync(
    "D:/My Projects/r3bucket/public/image.png"
  );
  console.log("🚀 ~ POST ~ fileContent:", fileContent);
  const res = await r3
    .upload({
      Body: fileContent,
      Bucket: "mybucket",
      Key: fileName,
    })
    .promise();
  console.log("🚀 ~ GET ~ res:", res);
};

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
    const response = await r3.send(putObjectCommand);
    console.log("File uploaded successfully:", response);
    return NextResponse.json({ sucess: true }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ sucess: false }, { status: 500 });
  }
};

// read this https://medium.com/@xhowais/next-js-file-upload-api-tutorial-local-directroy-7ec039efbd66
// https://gist.github.com/agmm/da47a027f3d73870020a5102388dd820
