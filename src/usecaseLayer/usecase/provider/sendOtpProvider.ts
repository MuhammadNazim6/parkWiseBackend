import Nodemailer from '../../../infrastructureLayer/services/nodemailer';
import ErrorResponse from '../../handler/errorResponse';
import { IOtpRepository } from '../../interface/repository/IOtpRepository';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import { IOtpSendResponse } from '../../interface/services/IResponses';


export const sendOtpProvider = async (
  requestValidator: IRequestValidator,
  providerRepository: IProviderRepository,
  otpRepository: IOtpRepository,
  email: string,
  name: string
): Promise<IOtpSendResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, name },
      ['email', 'name']
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string)
    }

    const provider = await providerRepository.findProvider(email);
    if (provider) {
      return {
        status: 200,
        success: false,
        message: `The provider account already exists`,
      }
    }
    const role = 'provider'
    const nodemailerInstance = new Nodemailer();
    const OTP = await nodemailerInstance.sendOtpToMail(email, name, role);

    if (OTP) {
      let expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 5);

      const otpSaved = await otpRepository.createOtpCollection(email, role, OTP, expiryTime)
      return {
        status: 200,
        success: true,
      }
    }
    // If unable to send otp
    return {
      status: 500,
      success: false,
      message: "Failed to send OTP email"
    };

  } catch (error) {
    throw error
  }
} 