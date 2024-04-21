export interface INodemailer {
  generateOTP(email: string): string;
  sendEmailVerification(email: string, name: string): Promise<string>;
  verifyEmail(enteredOTP: string, email: string): Promise<string>;
}
