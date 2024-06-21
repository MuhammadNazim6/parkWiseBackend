import { AdminAdapter } from "../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../usecaseLayer/usecase/adminUseCase";
import { ProviderUseCase } from "../../../usecaseLayer/usecase/providerUseCase";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
import AddressModel from "../../database/model/addressModel";
import AdminModel from "../../database/model/adminModel";
import OtpModel from "../../database/model/otpModel";
import ParkingProviderModel from "../../database/model/providerModel";
import UserModel from "../../database/model/userModel";
import { AddressRepository } from "../../database/repository/addressRepository";
import { AdminRepository } from "../../database/repository/adminRepository";
import { OtpRepository } from "../../database/repository/otpRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";
import { BookingRepository } from "../../database/repository/bookingRepository";
import BookingModel from "../../database/model/bookingModel";
import S3Bucket from "../../services/s3BucketAws";
import { FeedbackRepository } from "../../database/repository/feedbackRepository";
import FeedbackModel from "../../database/model/feedbackModel";


const adminRepository = new AdminRepository(AdminModel);
const providerRepository = new ProviderRepository(ParkingProviderModel);
const userRepository = new UserRepository(UserModel);
const otpRepository = new OtpRepository(OtpModel);
const addressRepository = new AddressRepository(AddressModel);
const bcrypt = new Encrypt();
const s3Bucket = new S3Bucket();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const nodemailer = new Nodemailer();
const bookingRepository = new BookingRepository(BookingModel)
const feedbackRepository = new FeedbackRepository(FeedbackModel)

const adminUseCase = new AdminUseCase(
  adminRepository,
  bcrypt,
  jwt,
  requestValidator,
);

const providerUseCase = new ProviderUseCase(
  providerRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  otpRepository,
  addressRepository,
  bookingRepository,
  s3Bucket
)

const userUseCase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  otpRepository,
  providerRepository,
  s3Bucket,
  bookingRepository,
  feedbackRepository
)

const adminAdapter = new AdminAdapter(adminUseCase, providerUseCase, userUseCase);

export { adminAdapter, adminRepository };    