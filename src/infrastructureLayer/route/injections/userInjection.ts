import { UserAdapter } from "../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
import { ProviderUseCase } from "../../../usecaseLayer/usecase/providerUseCase";
import OtpModel from "../../database/model/otpModel";
import ParkingProviderModel from "../../database/model/providerModel";
import UserModel from "../../database/model/userModel";
import { OtpRepository } from "../../database/repository/otpRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";
import { AddressRepository } from "../../database/repository/addressRepository";
import AddressModel from "../../database/model/addressModel";
import { BookingRepository } from "../../database/repository/bookingRepository";
import BookingModel from "../../database/model/bookingModel";
import S3Bucket from "../../services/s3BucketAws";
import { FeedbackRepository } from "../../database/repository/feedbackRepository";
import FeedbackModel from "../../database/model/feedbackModel";
import { SuggestionRepository } from "../../database/repository/suggestionRepository";
import SuggestionModel from "../../database/model/suggestionsModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import AdminModel from "../../database/model/adminModel";


const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const s3Bucket = new S3Bucket();
const requestValidator = new RequestValidator();
const otpRepository = new OtpRepository(OtpModel);
const addressRepository = new AddressRepository(AddressModel);
const providerRepository = new ProviderRepository(ParkingProviderModel)
const bookingRepository = new BookingRepository(BookingModel)
const feedbackRepository = new FeedbackRepository(FeedbackModel)
const suggestionRepository = new SuggestionRepository(SuggestionModel)
const adminRepository = new AdminRepository(AdminModel)


const userusecase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  otpRepository,
  providerRepository,
  s3Bucket,
  bookingRepository,
  feedbackRepository,
  suggestionRepository,
  adminRepository
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
  s3Bucket,
  userRepository,
  adminRepository
)
const userAdapter = new UserAdapter(userusecase, providerUseCase);

export { userAdapter, userRepository };