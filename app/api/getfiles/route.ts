import { r2 } from "@/lib/r2client";
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const command = new ListObjectsCommand({ Bucket: "mybucket" });
  const resp = await r2.send(command);
  const data = resp.Contents
  console.log("🚀 ~ GET ~ resp:", resp.Contents)
  return NextResponse.json({ data });
};
