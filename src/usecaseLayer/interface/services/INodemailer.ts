export interface INodemailer {
  generateOTP(email: string): string;
  sendOtpToMail(email: string, name: string, role:string): Promise<string>;
  // verifyEmail(enteredOTP: string, email: string): Promise<string>;
}
