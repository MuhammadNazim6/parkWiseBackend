import { IUser } from "../../../domainLayer/users"
import { IUserRepository } from "../../interface/repository/IUserRepository"

export const getUserDetails = async (
  userRepository: IUserRepository,
  userId:string
): Promise<IUser> => {
  const userDetails = await userRepository.findUserById(userId)
  return userDetails
}  