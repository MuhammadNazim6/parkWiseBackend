import { IProviderRepository } from "../../interface/repository/IProviderRepository"

export const getRequests = async (
  providerRepository: IProviderRepository,
  page:string
): Promise<{}> => {
  const data = await providerRepository.getProviderRequests(page)

  return data
}  