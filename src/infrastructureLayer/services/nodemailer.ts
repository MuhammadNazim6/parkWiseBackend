import nodemailer from 'nodemailer';
import { INodemailer } from '../../usecaseLayer/interface/services/INodemailer';

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

  private prepareEmailContent(name: string, role: string, otp: string, message: string): string {
    return `<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-radius: 10px;">
        <h3 style="color: #333;">Dear ${name},</h3>
        <p style="color: #555; font-size: 16px;">${message}</p>
        <div style="margin: 20px 0; background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <p style="margin: 0; font-size: 18px; color: #333;">OTP: <span id="otpDisplay" style="font-weight: bold;">${otp}</span></p>
        </div>
        <p style="color: #555; font-size: 16px;">Please use this code to complete the process.</p>
        <p style="color: #555; font-size: 16px;">Best Regards,<br/>The ParkWise Team</p>
      </div>
    </div>`;
  }

 
  private async sendEmailWithOTP(email: string, name: string, role: string, subject: string, message: string): Promise<string> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASSWORD_NODEMAILER
        }
      });

      const otp = this.generateOTP();
      this.otps.set(email, otp);

      const htmlContent = this.prepareEmailContent(name, role, otp, message);

      const mailOptions = {
        from: process.env.EMAIL_NODEMAILER,
        to: email,
        subject: subject,
        html: htmlContent
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return otp;

    } catch (error) {
      throw new Error(`Unable to send email to ${email}: ${error}`);
    }
  }

  // OTP for email verification
  async sendOtpToMail(email: string, name: string, role: string): Promise<string> {
    const subject = 'Email Verification for ParkWise';
    const message = `Thank you for choosing ParkWise. Please verify your email to complete your registration as a ${role}.`;
    return await this.sendEmailWithOTP(email, name, role, subject, message);
  }

  // OTP for resetting password
  async sendOtpForForgotPassword(email: string, name: string, role: string): Promise<string> {
    const subject = 'Password Reset for ParkWise';
    const message = 'You have requested to reset your password on ParkWise. Please use the OTP below to proceed.';
    return await this.sendEmailWithOTP(email, name, role, subject, message);
  }


  // mail notifying password changed
  async sendChangePasswordMail(email: string, name: string, role: string): Promise<string> {
    const subject = 'Password updated for parkwise';
    const message = ` We're writing to confirm that your password for your ParkWise account has been successfully changed.
    
    If you did not initiate this password change, please contact our support team immediately at support@parkwise.com.
    
    Thank you for using ParkWise. We appreciate your business and are committed to keeping your account secure.
    
    Best regards,
    The ParkWise Team`;
    return await this.sendEmailWithOTP(email, name, role, subject, message);
  }
}

export default Nodemailer;
