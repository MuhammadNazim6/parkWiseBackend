import { IProvUpdateProfile } from "../../../infrastructureLayer/types/providerTypes";
import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const updateProvProfile = async (
  providerRepository: IProviderRepository,
  lotId: string,
  toUpdate: IProvUpdateProfile
): Promise<{}> => {
  
  const updatedProvider = await providerRepository.updateProfile(lotId, toUpdate)
  if (updatedProvider) {
    return updatedProvider
  } else {
    return false
  }

}  