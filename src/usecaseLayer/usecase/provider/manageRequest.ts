import { IProviderRepository } from "../../interface/repository/IProviderRepository"
import { IBlockUnblockResponse } from "../../interface/services/IResponses"

export const acceptRequest = async (
  providerRepository: IProviderRepository,
  id: string
): Promise<IBlockUnblockResponse> => {
  const provider = await providerRepository.findProviderWithId(id)
  if (provider) {
    const requestAccepted = await providerRepository.manageRequest(id, 'true')
    return {
      status: 200,
      success: true,
      message: `Provider request accepted successfully`
    }
  } else {
    return {
      status: 400,
      success: false,
      message: 'Provider not found'
    }
  }

}


export const declineRequest = async (
  providerRepository: IProviderRepository,
  id: string
): Promise<IBlockUnblockResponse> => {
  const provider = await providerRepository.findProviderWithId(id)
  if (provider) {
    const requestRejected = await providerRepository.manageRequest(id, 'rejected')
    return {
      status: 200,
      success: true,
      message: `Provider request rejected successfully`
    }
  } else {
    return {
      status: 400,
      success: false,
      message: 'Provider not found'
    }
  }

}  