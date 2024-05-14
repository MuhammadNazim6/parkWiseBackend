import { IProviderRepository } from "../../interface/repository/IProviderRepository"
import { IBlockUnblockResponse } from "../../interface/services/IResponses"
export const blockUnblockProvider = async (
  providerRepository: IProviderRepository,
  email: string
): Promise<IBlockUnblockResponse> => {
  const provider = await providerRepository.findProvider(email)
  if (provider) {
    const updatedIsBlocked = !provider.isBlocked;
    const blockedUnblockedStatus = await providerRepository.blockUnblockProvider(email, updatedIsBlocked)
    const state = updatedIsBlocked ? 'Blocked' : 'Unblocked'
    return {
      status: 200,
      success: true,
      message: `Provider ${state} successfully`
    }
  } else {
    return {
      status: 400,
      success: false,
      message: 'Provider not found'
    }
  }

}  