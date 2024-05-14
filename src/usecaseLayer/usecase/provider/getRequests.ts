import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const getRequests = async (
  providerRepository: IProviderRepository,
): Promise<{}[]> => {
  const getProvidersRequests = await providerRepository.getProviderRequests()

  return getProvidersRequests
}  