export interface INodemailer {
  generateOTP(email: string): string;
  sendOtpToMail(email: string, name: string, role: string): Promise<string>;
  sendOtpForForgotPassword(email: string, name: string, role: string): Promise<string>;
  sendChangePasswordMail(email: string, name: string, role: string): Promise<string>;
}
