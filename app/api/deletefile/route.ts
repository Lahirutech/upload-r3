import { r2 } from "@/lib/r2client";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("key") as string;

  const deleteObjCommand = new DeleteObjectCommand({
    Bucket: "mybucket",
    Key: id,
  });

  const resp = await r2.send(deleteObjCommand);
  console.log("🚀 ~ GET ~ resp:", resp);
  return NextResponse.json({ resp });
};
