import { IUserRepository } from "../../interface/repository/IUserRepository";
import IHashpassword from "../../interface/services/IHashpassword";

export const checkUserPassword = async (
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  userId: string,
  password: string
): Promise<boolean> => {
  try {
    const user = await userRepository.findUserById(userId)
    if (user) {
      const checked = await bcrypt.compare(password, user.password)
      if (checked) {
        return true
      }
    } 
    return false

  } catch (error) {
    throw error
  }
}
