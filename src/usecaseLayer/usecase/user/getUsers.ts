import { IUserRepository } from "../../interface/repository/IUserRepository"

export const getUsers = async (
  userRepository: IUserRepository,
  page:string
): Promise<{}> => {
  const getUsers = await userRepository.getUsers(page)
  return getUsers
}  