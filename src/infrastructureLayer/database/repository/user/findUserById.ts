import { IUser } from "../../../../domainLayer/users";
import UserModel from "../../model/userModel";

export const findUserById = async (
  id: string,
  userModels: typeof UserModel
) => {
  try {
    const user = await userModels.findOne({ _id: id });
    return user as IUser
  } catch (error) {
    throw error
  }
}