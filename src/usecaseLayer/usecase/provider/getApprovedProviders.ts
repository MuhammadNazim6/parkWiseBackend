import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const getApprovedProviders = async (
  providerRepository: IProviderRepository,
  page:string
): Promise<{}> => {
  const datas = await providerRepository.getApprovedProviders(page)
  return datas
}  