import UserModel from "../../model/userModel";

export const loginUser = async (
  email:string,
  userModels: typeof UserModel
) => {
  try {
    const userExists = await userModels.findOne({email:email});
    return userExists
  } catch (error) {
    throw error
  }
}