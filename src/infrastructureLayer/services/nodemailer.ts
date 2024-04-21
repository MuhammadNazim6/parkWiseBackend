import nodemailer from 'nodemailer'
import { INodemailer } from '../../usecaseLayer/interface/services/INodemailer'

class Nodemailer implements INodemailer{
  private otps: Map<string,string> = new Map();

  // generating otp
  generateOTP(): string {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    console.log(`OTP GENERATED ${otp}`);
    
    return otp;
  }
}

export default Nodemailer;