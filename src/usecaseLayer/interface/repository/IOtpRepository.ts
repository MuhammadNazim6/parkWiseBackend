import { IOtp } from '../../../domainLayer/otps';

export interface IOtpRepository {
  findOtp(email: string): Promise<IOtp | null>;
  createOtpCollection(email: string, role: string, otp: string, expiry_at: Date): Promise<IOtp | null>;
}
