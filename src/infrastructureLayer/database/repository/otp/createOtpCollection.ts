import { IOtp } from "../../../../domainLayer/otps";
import { IOtpDocSaveResponse } from "../../../../usecaseLayer/interface/services/IResponses";
import OtpModel from "../../model/otpModel";



export const createOtpCollection = async (
  newOtpDoc: IOtp,
  otpModels: typeof OtpModel
): Promise<IOtpDocSaveResponse> => {
  try {
    const doc = await otpModels.create(newOtpDoc);
    await doc.save()
    const responseData: IOtpDocSaveResponse = {
      email : doc.email,
      otp: doc.otp,
      role: doc.role,
      expiry_at: doc.expiry_at
    };
  return responseData; 
    
  } catch (error) {
    throw error
  }
}