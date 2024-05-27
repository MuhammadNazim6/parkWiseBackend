import { IParkingProviderReady } from "../../../domainLayer/providers";
import { IFile } from "../../../infrastructureLayer/middleware/multer";

export interface IS3Bucket {
  randomImageName(bytes: number): string;
  uploadArrayOfImagesToS3(files: IFile[]): Promise<string[]>;
  getParkingLotsArrayImageUrls(lots: IParkingProviderReady[]): Promise<IParkingProviderReady[]>
}