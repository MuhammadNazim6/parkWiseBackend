import nodemailer from 'nodemailer'
import { INodemailer } from '../../usecaseLayer/interface/services/INodemailer'


class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();

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

  async sendOtpToMail(email: string, name: string, role:string): Promise<string> {
    try {
      console.log(email, name, ' Reaching in the service block');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASSWORD_NODEMAILER
        }
      })

      if (this.otps) {
        this.otps.clear();
      }
      const otp = this.generateOTP();
      this.otps.set(email, otp);
      console.log(this.otps);


      

      //mail content
      const mailOptions = {
        from: process.env.EMAIL_NODEMAILER,
        to: email,
        subject: 'OTP for Email Verification of Thrift Kicks',
        html: 
        `<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-radius: 10px;">
          <h3 style="color: #333;">Dear ${name},</h3>
          <p style="color: #555; font-size: 16px;">Thank you for choosing ParkWise. Please verify your email to complete your registration as a ${role}.</p>
          
          <div style="margin: 20px 0; background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <p style="margin: 0; font-size: 18px; color: #333;">OTP: <span id="otpDisplay" style="font-weight: bold;">${otp}</span></p>
          </div>
      
          <p style="color: #555; font-size: 16px;">Please use this code to complete the email verification process.</p>
          <p style="color: #555; font-size: 16px;">Best Regards,<br/>The ParkWise Team</p>
        </div>
      </div> 
        `
      };


      await transporter.sendMail(mailOptions)
      console.log('Email sent succesffully');
      return otp

    } catch (error) {
      throw new Error(
        `Unable to send email verification email to ${email}: ${error}`
      );
    }
  }
}


export default Nodemailer;