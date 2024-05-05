import OtpModel from "../../model/otpModel";

export const findOtp = async (
  email:string,
  otpModels: typeof OtpModel
) => {
  try {
    const otpExists = await otpModels.find({email:email}).sort({ expiry_at: -1 }).limit(1)
    return otpExists[0]
  } catch (error) {
    throw error
  }
}