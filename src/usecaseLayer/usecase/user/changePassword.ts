import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { INodemailer } from "../../interface/services/INodemailer";
import { ISuccessResponse } from "../../interface/services/IResponses";

export const changePassword = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  nodemailer: INodemailer,
  email: string,
  password: string
): Promise<ISuccessResponse> => {
  try {
    const user = await userRepository.findUser(email);
    const provider = await providerRepository.findProvider(email);
    const hashedPassword = await bcrypt.createHash(password);
    if (user) {
      const userPassChanged = await userRepository.changePassword(email, hashedPassword)
      if (userPassChanged) {
        await nodemailer.sendChangePasswordMail(email,user.name,'user')
        return {
          status: 200,
          success: true,
          message: 'User password updated'
        }
      }
    } else if (provider) {
      const providerPassChanged = await providerRepository.changePassword(email, hashedPassword)
      if (providerPassChanged) {
        await nodemailer.sendChangePasswordMail(email,provider.name,'provider')
        return {
          status: 200,
          success: true,
          message: 'Provider password updated'
        }
      }
    }
    return {
      status: 404,
      success: false,
      message: 'No account with this email found'
    }

  } catch (error) {
    throw error
  }
}