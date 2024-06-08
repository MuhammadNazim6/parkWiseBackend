import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import { IAdminRepsitory } from "../interface/repository/IAdminRepository";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";
import { resendOtp } from "./common/resendOtp";
import { commonLogin } from "./common/commonLogin";
import { updateToken } from "./common/updateToken";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
import { getBookingDetails } from "./common/getBookingDetails";

export class CommonUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly otpRepository: IOtpRepository;
  private readonly providerRepository: IProviderRepository;
  private readonly adminRepository: IAdminRepsitory;
  private readonly bookingRepository: IBookingRepository;
  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    providerRepository: IProviderRepository,
    adminRepository: IAdminRepsitory,
    bookingRepository: IBookingRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.providerRepository = providerRepository;
    this.adminRepository = adminRepository;
    this.bookingRepository = bookingRepository;
  }

  // For logging in user,admin,provider
  async commonLogin({ email, password }: { email: string, password: string }) {
    return commonLogin(
      this.userRepository,
      this.providerRepository,
      this.adminRepository,
      this.bcrypt,
      this.nodemailer,
      this.otpRepository,
      this.requestValidator,
      this.jwt,
      email,
      password
    )
  }


  // For password changing
  async resendOtp({ email }: { email: string }) {
    return resendOtp(
      this.userRepository,
      this.providerRepository,
      this.bcrypt,
      this.nodemailer,
      this.otpRepository,
      email,
    )
  }
  // For refreshing expired token
  async updateToken(refreshToken: string) {
    return updateToken(
      refreshToken,
      this.jwt,
    )
  }
  async getBookingDetails(bookingId: string) {
    return getBookingDetails(
      bookingId,
      this.bookingRepository)
  }
}