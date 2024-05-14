import { IUserRepository } from "../../interface/repository/IUserRepository"
import { IBlockUnblockResponse } from "../../interface/services/IResponses"

export const blockUnblockUser = async (
  userRepository: IUserRepository,
  email: string
): Promise<IBlockUnblockResponse> => {
  const user = await userRepository.findUser(email)
  if (user) {
    const updatedIsBlocked = !user.isBlocked;
    const blockedUnblockedStatus = await userRepository.blockUnblockUser(email, updatedIsBlocked)
    const state = updatedIsBlocked ? 'Blocked' : 'Unblocked'
    return {
      status: 200,
      success: true,
      message: `User ${state} successfully`
    }
  } else {
    return {
      status: 400,
      success: false,
      message: 'User not found'
    }
  }

}  