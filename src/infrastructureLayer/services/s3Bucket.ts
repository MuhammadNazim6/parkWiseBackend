import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { IFile } from "../middleware/multer";
import crypto from 'crypto'

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const s3AccessKey = process.env.S3_ACCESS_KEY
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  credentials: {
    accessKeyId: s3AccessKey as string,
    secretAccessKey: s3SecretAccessKey as string
  },
  region: bucketRegion
})

export const uploadToS3 = async (params: params) => {
  const command = new PutObjectCommand(params)
  await s3Client.send(command)
}

// For uploading and adding a custom name to the images
export const uploadArrayOfImagesToS3 = async (files: IFile[]) => {
  const uploadedImageNames: string[] = [];

  for (const file of files) {
    const stream = Readable.from(file.buffer)
    const imageName = randomImageName()
    const uploader = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.BUCKET_NAME as string,
        Key: imageName,
        Body: stream,
        ContentType: file.mimetype as string
      },
    });

    try {
      await uploader.done();
      console.log(`${file.originalname} uploaded successfully`);
      uploadedImageNames.push(imageName);
    } catch (error) {
      console.error(`Error uploading ${file.originalname} to S3:`, error);
    }
  }
  return uploadedImageNames
}

interface params {
  Bucket: string;
  Key: string;
  body: Buffer;
  ContentType: string;
}