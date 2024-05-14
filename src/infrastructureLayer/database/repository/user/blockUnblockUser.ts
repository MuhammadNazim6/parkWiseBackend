import UserModel from "../../model/userModel";


export const blockUnblockUser = async (
  email: string,
  state: boolean,
  userModels: typeof UserModel
): Promise<boolean> => {
  try {
    const blockedUnblockedUser = await userModels.updateOne({ email }, { isBlocked: state })
    return blockedUnblockedUser.modifiedCount > 0
    
  } catch (error) {
    throw error
  }
}