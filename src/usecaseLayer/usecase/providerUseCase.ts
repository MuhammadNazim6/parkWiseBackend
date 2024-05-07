import { IParkingProvider } from "../../domainLayer/providers";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";
import { createProvider } from "./provider/createProvider";
import { sendOtpProvider } from './provider/sendOtpProvider';
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import { checkOtpCommon } from "./user/otpRelated";


export class ProviderUseCase {
  private readonly providerRepository: IProviderRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly otpRepository: IOtpRepository;

  constructor(
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository:IOtpRepository
  ) {
    this.providerRepository = providerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
  }

  // provider register
  async createProvider({
    name,
    email,
    password,
    mobile
  }: {
    email: string,
    password: string,
    name: string,
    mobile: number
  }) {
    return createProvider(
      this.requestValidator,
      this.providerRepository,
      this.bcrypt,
      this.jwt,
      name,
      mobile,
      email,
      password
    )
  }
  

  // sending otp to provider
  async sendOtpProvider({
    email,
    name
  }: {
    email: string,
    name: string
  }) {
    return sendOtpProvider(
      this.requestValidator,
      this.providerRepository,
      this.otpRepository,
      email,
      name
    )
  }

  
  // checking otp of provider
  async checkOtpProvider({
    email,
    enteredOtp
  }: {
    email: string,
    enteredOtp:string
  }) {
    return checkOtpCommon(
      this.requestValidator,
      this.otpRepository,
      email,
      enteredOtp

    )

  }
}