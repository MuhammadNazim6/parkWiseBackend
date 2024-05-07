import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { INodemailer } from "../../interface/services/INodemailer";
import { IOtpRepository } from "../../interface/repository/IOtpRepository";
import { IOtpSendResponse } from "../../interface/services/IResponses";
import e from "express";

export const resendOtp = async (
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  nodemailer: INodemailer,
  otpRepository: IOtpRepository,
  email: string,
): Promise<IOtpSendResponse> => {
  try {
    const user = await userRepository.findUser(email);
    const provider = await providerRepository.findProvider(email);
    let name, role;
    if (user) {
      name = user.name;
      role = 'user';

    } else if (provider) {
      name = provider.name;
      role = 'provider';
    } else {
      return {
        status: 400,
        success: false,
        message: 'No account with this email found'
      }
    }

    const OTP = await nodemailer.sendOtpToMail(email, name, role);
    if (OTP) {
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
      message: 'Unable to send otp to mail'
    }

  } catch (error) {
    throw error
  }
}