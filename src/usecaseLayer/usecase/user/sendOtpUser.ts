import Nodemailer from '../../../infrastructureLayer/services/nodemailer';
import ErrorResponse from '../../handler/errorResponse';
import { IOtpRepository } from '../../interface/repository/IOtpRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import { IOtpSendResponse } from '../../interface/services/IResponses';


export const sendOtpUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  otpRepository: IOtpRepository,
  email: string,
  name: string
): Promise<IOtpSendResponse> => {
  try {
    console.log('2 in sendOtpUser.ts');

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
        message: `The user already exists`,
      }
    }
    const role = 'user'
    const nodemailerInstance = new Nodemailer();
    const OTP = await nodemailerInstance.sendOtpToMail(email, name, role);


    if (OTP) {
      let expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 5);

      const otpSaved = await otpRepository.createOtpCollection(email, role , OTP, expiryTime)
      return {
        status: 200,
        success: true,
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