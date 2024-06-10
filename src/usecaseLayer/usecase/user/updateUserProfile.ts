import { IFile } from "../../../infrastructureLayer/middleware/multer";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IS3Bucket } from "../../interface/services/IS3Bucket";

export const updateUserProfile = async (
  userRepository: IUserRepository,
  s3Bucket: IS3Bucket,
  id: string,
  name: string,
  email: string,
  mobile: number,
  files: IFile[]
): Promise<{}> => {
  if (files.length) {
    const uploadedImageName = await s3Bucket.uploadArrayOfImagesToS3(files)
    const updatedProfile = await userRepository.updateUserProfile(id, email, name, mobile, uploadedImageName[0])
  } else {
    const updatedProfile = await userRepository.updateUserProfileWithoutImage(id, email, name, mobile)
  }
  return updateUserProfile
}