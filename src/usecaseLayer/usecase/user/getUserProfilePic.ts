import { IParkingProviderReady } from "../../../domainLayer/providers";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IS3Bucket } from "../../interface/services/IS3Bucket";

export const getUserProfilePic = async (
  userRepository: IUserRepository,
  s3Bucket: IS3Bucket,
  id: string
): Promise<string> => {
  try {
    const user = await userRepository.findUserById(id)
    console.log('Reachihng in the user usercasse', user);

    const imageUrl = await s3Bucket.getImageUrl(user.profilePic as string)
    console.log(imageUrl);
    return imageUrl
  } catch (error) {
    throw error
  }
}