import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const bucketName = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const s3AccessKey = process.env.S3_ACCESS_KEY as string;
const s3SecretKey = process.env.S3_SECRET_KEY as string;

export const s3 = new S3Client({
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretKey,
  },
  region: bucketRegion,
});
