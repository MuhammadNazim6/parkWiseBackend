import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const getApprovedProviders = async (
  providerRepository: IProviderRepository,
): Promise<{}[]> => {
  const providers = await providerRepository.getApprovedProviders()

  return providers
}  