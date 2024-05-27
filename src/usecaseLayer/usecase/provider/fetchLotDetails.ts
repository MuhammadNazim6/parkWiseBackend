import { IParkingProviderReady } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import { IS3Bucket } from "../../interface/services/IS3Bucket";

export const fetchLotDetails = async (
  providerRepository: IProviderRepository,
  s3Bucket: IS3Bucket,
  lotId: string
): Promise<{}[]> => {
  try {
    const lotDetails = await providerRepository.getLotDetails(lotId)
    const imageUrlAdded = await s3Bucket.getParkingLotsArrayImageUrls(lotDetails as IParkingProviderReady[])
    console.log(imageUrlAdded);
    return imageUrlAdded
  } catch (error) {
    throw error
  }
}