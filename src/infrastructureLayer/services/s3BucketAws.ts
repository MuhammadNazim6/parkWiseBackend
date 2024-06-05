import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { IFile } from "../middleware/multer";
import crypto from 'crypto'
import { IS3Bucket } from "../../usecaseLayer/interface/services/IS3Bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IParkingProviderReady } from "../../domainLayer/providers";


class S3Bucket implements IS3Bucket {
  private bucketName: string;
  private bucketRegion: string;
  private s3AccessKey: string;
  private s3SecretAccessKey: string;
  private s3Client: S3Client;

  constructor() {
    this.bucketName = process.env.BUCKET_NAME as string;
    this.bucketRegion = process.env.BUCKET_REGION as string;
    this.s3AccessKey = process.env.S3_ACCESS_KEY as string;
    this.s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.s3AccessKey,
        secretAccessKey: this.s3SecretAccessKey,
      },
      region: this.bucketRegion,
    });
  }

  randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

  uploadArrayOfImagesToS3 = async (files: IFile[]) => {
    const uploadedImageNames: string[] = [];
    for (const file of files) {
      const stream = Readable.from(file.buffer)
      const imageName = this.randomImageName()
      const uploader = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName as string,
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

  getParkingLotsArrayImageUrls = async (lots: IParkingProviderReady[]): Promise<IParkingProviderReady[]> => {
    const lotUrlsPromises = lots.map(async (lot) => {
      const imageUrlsPromises = lot.images.map(async (imageName) => {
        const getObjectParams = {
          Bucket: this.bucketName,
          Key: imageName
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 })
        return url
      })
      lot.images = await Promise.all(imageUrlsPromises)
      return lot
    })
    return Promise.all(lotUrlsPromises)
  }

  getImageUrl = async (profilePic:string):Promise<string> => {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: profilePic
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 })
    return url
  }
}

export default S3Bucket;
