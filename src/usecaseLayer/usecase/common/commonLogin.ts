import { IAdminRepsitory } from "../../interface/repository/IAdminRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import { INodemailer } from "../../interface/services/INodemailer";
import { IOtpRepository } from "../../interface/repository/IOtpRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { ILoginResponse } from "../../interface/services/IResponses";
import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { Ijwt } from "../../interface/services/Ijwt";

export const commonLogin = async (
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  adminRepository: IAdminRepsitory,
  bcrypt: IHashpassword,
  nodemailer: INodemailer,
  otpRepository: IOtpRepository,
  requestValidator: IRequestValidator,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      return {
        status: 400,
        success: false,
        message: `The username or password is incorrect`
      }
    }

    const user = await userRepository.findUser(email)
    if (user) {
      const matchedPassword = await bcrypt.compare(password, user.password)
      if (!matchedPassword) {
        return {
          status: 200,
          success: false,
          message: `The username password is incorrect`,
        }
      }
      const token = jwt.createJWT(user._id as string, email, 'user', user.name);
      return {
        status: 200,
        success: true,
        token: token,
        data: {
          name: user.name,
          role: 'user',
          email: email
        }
      };
    }

    // If there is no user then
    const provider = await providerRepository.findProvider(email)
    if (provider) {
      const matchedPassword = await bcrypt.compare(password, provider.password)
      if (!matchedPassword) {
        return {
          status: 200,
          success: false,
          message: `The username or password is incorrect`,
        }
      }
      const token = jwt.createJWT(provider._id as string, email, 'provider', provider.name);
      return {
        status: 200,
        success: true,
        token: token,
        data: {
          name: provider.name,
          role: 'provider',
          email: email
        }
      };
    }

    const admin = await adminRepository.findAdmin(email)
    if (admin) {
      const matchedPassword = await bcrypt.compare(password, admin.password)
      if (!matchedPassword) {
        return {
          status: 200,
          success: false,
          message: `The username or password is incorrect`,
        }
      }
      const token = jwt.createJWT(admin._id as string, email, 'admin', admin.name);
      return {
        status: 200,
        success: true,
        token: token,
        data: {
          name: admin.name,
          role: 'admin',
          email: email
        }
      };
    }
    return {
      status: 200,
      success: false,
      message: 'Incorrect username or password'
    }
  } catch (error) {
    throw error
  }
}