import UserModel from "../../model/userModel";

export const getUsers = async (
  userModels: typeof UserModel
) => {
  try {
    const userExists = await userModels.find();
    return userExists
  } catch (error) {
    throw error
  }
}