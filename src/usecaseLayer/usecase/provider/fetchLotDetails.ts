import { IProviderRepository } from "../../interface/repository/IProviderRepository";

export const fetchLotDetails = async (
  providerRepository: IProviderRepository,
  lotId: string
): Promise<{}[]> => {
  try {
    const lotDetails = await providerRepository.getLotDetails(lotId)
    return lotDetails
  } catch (error) {
    throw error
  }
}