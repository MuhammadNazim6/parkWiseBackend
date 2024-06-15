import { IParkingProvider, IParkingProviderReady } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";

export const getSenderName = async (
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  id: string
) => {
  const user = await userRepository.findUserById(id)
  if (user) {
    return user.name
  }
  const provider = await providerRepository.getLotDetails(id) as IParkingProviderReady[]
  if (provider) {
    console.log(provider[0].parkingName);
    
    return provider[0].parkingName
  }   
  return ''
}