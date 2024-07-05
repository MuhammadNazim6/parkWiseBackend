import ErrorResponse from '../../handler/errorResponse';
import { IAdminRepsitory } from '../../interface/repository/IAdminRepository';
import { IOtpRepository } from '../../interface/repository/IOtpRepository';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import { INodemailer } from '../../interface/services/INodemailer';
import { IOtpSendResponse } from '../../interface/services/IResponses';


export const sendOtpUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  email: string,
  name: string,
  nodemailer: INodemailer,
  provRepository: IProviderRepository,
  adminRepository: IAdminRepsitory,
): Promise<IOtpSendResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, name },
      ['email', 'name']
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string)
    }

    const user = await userRepository.findUser(email);
    if (user) {
      return {
        status: 200,
        success: false,
        message: `This user already exists`,
      }
    }
    // checking if prov exists with same email
    const prov = await provRepository.findProvider(email);
    if (prov) {
      return {
        status: 200,
        success: false,
        message: `This email is already registered as a provider`,
      }
    }

    // checking if admin exists with same email
    const admin = await adminRepository.findAdmin(email);
    if (admin) {
      return {
        status: 200,
        success: false,
        message: `This email is not available for registration`,
      }
    }

    const role = 'user'
    const OTP = await nodemailer.sendOtpToMail(email, name, role);


    if (OTP) {
      console.log(OTP);
      let expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 3);

      const otpSaved = await otpRepository.createOtpCollection(email, role, OTP, expiryTime)

      return {
        status: 200,
        success: true,
        message: 'Otp sent to mail'
      }
    }
    return {
      status: 500,
      success: false,
      message: "Failed to send OTP"
    };

  } catch (error) {
    throw error
  }
} 