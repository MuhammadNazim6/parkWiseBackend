import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { IErrorResponse, ISuccessResponse } from "../../interface/services/IResponses";
import { IOtpRepository } from "../../interface/repository/IOtpRepository";

export const checkOtpCommon = async (
  requestValidator: IRequestValidator,
  otpRepository: IOtpRepository,
  email: string,
  enteredOtp: string
): Promise<ISuccessResponse | IErrorResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email },
      ["email"]
    );

    if (!validation.success) {
      return {
        status: 401,
        success: false,
        message: `Entered email is invalid`,
      }
    }

    const otpFound = await otpRepository.findOtp(email)
    console.log('FOUND OTP IS ',otpFound);
    
    if (!otpFound) {
      return {
        status: 200,
        success: false,
        message: `The otp have been expired`,
      }
    }
console.log(typeof enteredOtp);
console.log(typeof otpFound.otp);

    if (enteredOtp !== otpFound.otp) {
      return {
        status: 200,
        success: false,
        message: `Entered otp is incorrect`,
      }
      // throw ErrorResponse.badRequest("Incorrect Otp");
    }

    return {
      status: 200,
      success: true,
      message: 'Entered otp is correct',
    };


  } catch (error) {
    console.log(error);
    
    throw error
  }
} 