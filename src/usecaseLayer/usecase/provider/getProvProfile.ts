import { IParkingProvider } from "../../../domainLayer/providers"
import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const getProvProfile = async (
  provRepository: IProviderRepository,
  provId: string
): Promise<IParkingProvider | null> => {
  try {
    const servicesCount = await provRepository.getProvProfile(provId)
    return servicesCount
  } catch (error) {
    throw error
  }

}