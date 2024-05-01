import OtpModel from "../../model/otpModel";

export const findOtp = async (
  email:string,
  otpModels: typeof OtpModel
) => {
  try {
    const otpExists = await otpModels.findOne({email:email});
    return otpExists
  } catch (error) {
    throw error
  }
}