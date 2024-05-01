import { IOtp } from "../../../domainLayer/otps";
import { IOtpRepository } from "../../../usecaseLayer/interface/repository/IOtpRepository";
import OtpModel from "../model/otpModel";
import { findOtp } from "./otp/findOtp";
import { createOtpCollection } from "./otp/createOtpCollection";

export class OtpRepository implements IOtpRepository {
  constructor(private readonly otpModel: typeof OtpModel) {
  }

  // finding otp from otp collection
  findOtp(email: string): Promise<IOtp | null> {
    return findOtp(email, this.otpModel)
  }

  createOtpCollection(email: string, role: string, otp: string, expiry_at: Date): Promise<IOtp | null> {
    return createOtpCollection({email, role, otp, expiry_at}, this.otpModel)
  }
}

