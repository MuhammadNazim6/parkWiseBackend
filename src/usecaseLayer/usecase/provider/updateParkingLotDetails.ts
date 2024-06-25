import { IProviderRepository } from "../../interface/repository/IProviderRepository"
import { IS3Bucket } from "../../interface/services/IS3Bucket"
import { IFile } from "../../../infrastructureLayer/middleware/multer"
import { IUpdateDataAvailableParkingLot, IUpdateParkingLot } from "../../interface/repository/ICommonInterfaces"
import { IParkingProviderReady } from "../../../domainLayer/providers"


export const updateParkingLotDetails = async (
  providerRepository: IProviderRepository,
  s3Bucket: IS3Bucket,
  body: IUpdateParkingLot,
  files: IFile[]
) => {
  try {
    const uploadedImageNames = await s3Bucket.uploadArrayOfImagesToS3(files)
    const provider = await providerRepository.findProvider(body.email) as IParkingProviderReady
    if (!provider) {
      throw Error('Provider not found')
    }

    // if the index is not an array
    if (!Array.isArray(body.indexes)) {
      body.indexes = [body.indexes];
    }

    let images: string[] = [...provider.images]

    uploadedImageNames.forEach((image, i) => {
      const index = parseInt(body.indexes[i])
      images[index] = image
    })

    let dataToUpdate: IUpdateDataAvailableParkingLot = {}

    if (body.airPressureCheckPrice !== undefined) {
      dataToUpdate.airPressureCheckPrice = parseInt(body.airPressureCheckPrice)
    }
    if (body.waterServicePrice !== undefined) {
      dataToUpdate.waterServicePrice = parseInt(body.waterServicePrice);
    }
    if (body.evChargeFacilityPrice !== undefined) {
      dataToUpdate.evChargeFacilityPrice = parseInt(body.evChargeFacilityPrice);
    }
    if (body.availableSpace !== undefined) {
      dataToUpdate.availableSpace = parseInt(body.availableSpace);
    }
    if (body.pricePerHour !== undefined) {
      dataToUpdate.pricePerHour = parseInt(body.pricePerHour);
    }

    const updatedParkingLot = await providerRepository.updateParkingLotDetails(body.email, body , images)
    if (updatedParkingLot) {
      return true
    }
  } catch (error) {
    console.log(error);
    throw error

  }
}

