import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";
import { createUser } from "./user/createUser";
import { logoutUser } from "./user/logoutUser";
import { sendOtpUser } from "./user/sendOtpUser"
import { checkOtpCommon } from "./user/otpRelated";
import { signGoogleUser } from "./user/signGoogle";
import { sendForgotPassword } from "./user/sendForgotPassword";
import { changePassword } from "./user/changePassword"
import { getUsers } from "./user/getUsers";
import { blockUnblockUser } from "./user/blockUnblockUser";
import { IFile } from "../../infrastructureLayer/middleware/multer";
import { updateUserProfile } from "./user/updateUserProfile";
import { IS3Bucket } from "../interface/services/IS3Bucket";
import { getUserProfilePic } from "./user/getUserProfilePic";
import { checkUserPassword } from "./user/checkUserPassword";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
import { fetchUserBookings } from "./user/fetchUserBookings";
import { cancelBooking } from "./user/cancelBooking";


export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator
  private readonly otpRepository: IOtpRepository
  private readonly providerRepository: IProviderRepository
  private readonly s3Bucket: IS3Bucket;
  private readonly bookingRepository: IBookingRepository;


  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    providerRepository: IProviderRepository,
    s3Bucket: IS3Bucket,
    bookingRepository: IBookingRepository,

  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.providerRepository = providerRepository;
    this.s3Bucket = s3Bucket;
    this.bookingRepository = bookingRepository;

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
      name,
      this.nodemailer,
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

  // signup/login google
  async sendForgotPassword({
    email,
  }: {
    email: string,

  }) {
    return sendForgotPassword(
      this.requestValidator,
      this.userRepository,
      this.providerRepository,
      this.otpRepository,
      this.bcrypt,
      this.nodemailer,
      this.jwt,
      email,
    )
  }

  // For password changing
  async changePassword({
    email,
    password
  }: {
    email: string,
    password: string,
  }) {
    return changePassword(
      this.requestValidator,
      this.userRepository,
      this.providerRepository,
      this.bcrypt,
      this.nodemailer,
      email,
      password
    )
  }

  async getUsers() {
    return getUsers(
      this.userRepository
    )
  }

  async blockUnblockUser({
    email,
  }: {
    email: string
  }) {
    return blockUnblockUser(
      this.userRepository,
      email
    )
  }

  async updateUserProfile({
    id,
    name,
    email,
    mobile
  }: {
    id: string,
    name: string,
    email: string,
    mobile: number
  },
    files: IFile[]) {
    return updateUserProfile(
      this.userRepository,
      this.s3Bucket,
      id,
      name,
      email,
      mobile,
      files
    )
  }

  async getUserProfilePic(id: string
  ) {
    return getUserProfilePic(
      this.userRepository,
      this.s3Bucket,
      id,
    )
  }

  async checkUserPassword(userId: string, password: string) {
    return checkUserPassword(
      this.userRepository,
      this.bcrypt,
      userId,
      password
    )
  }

  async fetchUserBookings(userId: string, page: string) {
    return fetchUserBookings(
      this.bookingRepository,
      userId,
      page
    )
  }

  async cancelBooking(bookingId: string) {
    return cancelBooking(
      this.bookingRepository,
      this.userRepository,
      bookingId
    )
  }

}