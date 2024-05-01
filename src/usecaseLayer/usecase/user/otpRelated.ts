import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { ILoginResponse } from "../../interface/services/IResponses";
import ErrorResponse from "../../handler/errorResponse";
import { IOtpRepository } from "../../interface/repository/IOtpRepository";

export const checkOtpCommon = async (
  requestValidator: IRequestValidator,
  otpRepository: IOtpRepository,
  email: string,
  enteredOtp: string
): Promise<ILoginResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email },
      ["email"]
    );

    if (!validation.success) {
      return {
        status: 401,
        success: false,
        message: `Email entered is invalid`,
      }
    }

    const otpFound = await otpRepository.findOtp(email)
    if (!otpFound) {
      return {
        status: 401,
        success: false,
        message: `The otp have been expired`,
      }
    }

    if(enteredOtp !== otpFound.otp){
      throw ErrorResponse.badRequest("Incorrect Otp");
    }

    return {
      status: 200,
      success: true,
      message: 'Entered otp is correct'
    };


  } catch (error) {
    throw error
  }
} 