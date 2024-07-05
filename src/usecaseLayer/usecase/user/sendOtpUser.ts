import Nodemailer from '../../../infrastructureLayer/services/nodemailer';
import ErrorResponse from '../../handler/errorResponse';
import { IOtpRepository } from '../../interface/repository/IOtpRepository';
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
  nodemailer: INodemailer
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
        status: 200, //changed from 200 to 409 for checking
        success: false,
        message: `This user already exists`,
      }
    }
    const role = 'user'
    // const nodemailerInstance = new Nodemailer();
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