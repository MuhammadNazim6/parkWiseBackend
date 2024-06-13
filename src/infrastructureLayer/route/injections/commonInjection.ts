import { CommonAdapter } from "../../../controllerLayer/commonAdapter";
import { CommonUseCase } from "../../../usecaseLayer/usecase/commonUseCase";
import AdminModel from "../../database/model/adminModel";
import BookingModel from "../../database/model/bookingModel";
import ConversationModel from "../../database/model/conversationModel";
import OtpModel from "../../database/model/otpModel";
import ParkingProviderModel from "../../database/model/providerModel";
import UserModel from "../../database/model/userModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { BookingRepository } from "../../database/repository/bookingRepository";
import { ConversationRepository } from "../../database/repository/conversationRepository";
import { OtpRepository } from "../../database/repository/otpRepository";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";


const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const otpRepository = new OtpRepository(OtpModel);
const providerRepository = new ProviderRepository(ParkingProviderModel)
const adminRepository = new AdminRepository(AdminModel)
const bookingRepository = new BookingRepository(BookingModel);
const conversationRepository = new ConversationRepository(ConversationModel);
const userusecase = new CommonUseCase(
  userRepository,
  bcrypt,
  jwt,  
  nodemailer,
  requestValidator,
  otpRepository,
  providerRepository,
  adminRepository,
  bookingRepository,
  conversationRepository
);

const commonAdapter = new CommonAdapter(userusecase);

export { commonAdapter, userRepository, providerRepository };