import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";

import { resendOtp } from "./common/resendOtp";

export class CommonUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator
  private readonly otpRepository: IOtpRepository
  private readonly providerRepository:IProviderRepository

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    providerRepository:IProviderRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.providerRepository = providerRepository
  }

    // For password changing
    async resendOtp({
      email,

    }:{
      email:string,
    }){
      return resendOtp(
        this.userRepository,
        this.providerRepository,
        this.bcrypt,
        this.nodemailer,
        this.otpRepository,
        email,
      )
    }


}