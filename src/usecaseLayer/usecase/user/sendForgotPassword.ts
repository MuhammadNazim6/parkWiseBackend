import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { IOtpSendResponse } from "../../interface/services/IResponses";
import { IOtpRepository } from "../../interface/repository/IOtpRepository";
import { Ijwt } from "../../interface/services/Ijwt";
import { INodemailer } from "../../interface/services/INodemailer";


export const sendForgotPassword = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  otpRepository: IOtpRepository,
  bcrypt: IHashpassword,
  nodemailer: INodemailer,
  jwt: Ijwt,
  email: string
): Promise<IOtpSendResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email },
      ['email']
    );
    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string)
    }
    console.log(email);
    
    const user = await userRepository.findUser(email);
    const provider = await providerRepository.findProvider(email);
    let Role;
    let Name;
    if (user) {
      Role = 'user';
      Name = user.name;
    } else if (provider) {
      Role = 'provider';
      Name = provider.name;
    } else {
      return {
        status: 404,
        success: false,
        message: 'No account found with this email'
      }
    }
    // sending otp and saving otp
    const OTP = await nodemailer.sendOtpForForgotPassword(email, Name, Role);
    if (OTP) {
      let expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 3);

      const otpSaved = await otpRepository.createOtpCollection(email, Role, OTP, expiryTime)
      return {
        status: 200,
        success: true,
        message: 'Otp sent to mail'
      }
    }else{
      return {
        status: 500,
        success: false,
        message: 'error while sending otp to mail'
      }
    }

  } catch (error) {
    throw error
  }
}