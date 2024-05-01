import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser"
import { logoutUser } from "./user/logoutUser";
import { sendOtpUser } from "./user/sendOtpUser"
import { checkOtpCommon } from "./user/otpRelated";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import { signGoogleUser } from "./user/signGoogle";

export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator
  private readonly otpRepository: IOtpRepository

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
  }

  // creating user
  async createUser({
    name,
    mobile,
    email,
    password,
  }: {
    name: string;
    mobile: number;
    email: string;
    password: string;
  }) {
    return createUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      mobile,
      email,
      password
    );
  }


  // logging in user
  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  // logging out user
  async logoutUser() {
    return logoutUser(
      this.userRepository,
    );
  }

  // sending otp to user
  async sendOtpUser({
    email,
    name
  }: {
    email: string,
    name: string
  }) {
    return sendOtpUser(
      this.requestValidator,
      this.userRepository,
      this.otpRepository,
      email,
      name
    )
  }


  // checking otp of user
  async checkOtpUser({
    email,
    enteredOtp
  }: {
    email: string,
    enteredOtp: string
  }) {
    return checkOtpCommon(
      this.requestValidator,
      this.otpRepository,
      email,
      enteredOtp

    )
  }


  // signup/login google
  async signGoogleUser({
    name,
    email,
    mobile,
    password,
    google
  }: {
    name: string,
    email: string,
    mobile: number,
    password: string,
    google: boolean
  }) {
    return signGoogleUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      email,
      mobile,
      password,
      google
    )
  }

}