import { IProviderRepository } from "../../interface/repository/IProviderRepository"
import { IS3Bucket } from "../../interface/services/IS3Bucket"
import { IFile } from "../../../infrastructureLayer/middleware/multer"
import { IUpdateParkingLot } from "../../interface/repository/ICommonInterfaces"


export const updateParkingLotDetails = async (
  providerRepository: IProviderRepository,
  s3Bucket:IS3Bucket,
  body:IUpdateParkingLot,
  files:IFile[] 
) =>{
  try {
    // const uploadedImageNames = await s3Bucket.uploadArrayOfImagesToS3(files)

    // const updatedParkingLot = await providerRepository.updateParkingLotDetails(uploadedImageNames)
    return true

  } catch (error) {
    
  }
}

