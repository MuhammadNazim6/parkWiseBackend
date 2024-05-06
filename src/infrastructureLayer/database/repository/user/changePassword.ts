import UserModel from "../../model/userModel";


export const changePassword = async (
  email:string,
  password:string,
  userModels: typeof UserModel
):Promise<boolean> => {
  try {
    const changedPassword = await userModels.updateOne({email},{password:password})
    return changedPassword.modifiedCount > 0
  } catch (error) {
    throw error
  }
}