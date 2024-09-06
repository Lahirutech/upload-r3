import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.endpoint ?? "",
  credentials: {
    accessKeyId: process.env.accessKeyId ?? "",
    secretAccessKey: process.env.secretAccessKey ?? "",
  },
});
