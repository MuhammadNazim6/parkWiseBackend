import { IUserRepository } from "../../interface/repository/IUserRepository"

export const getUsers = async (
  userRepository: IUserRepository,
): Promise<{}[]> => {
  const getUsers = await userRepository.getUsers()
  return getUsers
}  