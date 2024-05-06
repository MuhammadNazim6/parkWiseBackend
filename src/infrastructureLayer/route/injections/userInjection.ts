import { UserAdapter } from "../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/userUseCase";
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


const userRepository = new UserRepository(UserModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const otpRepository = new OtpRepository(OtpModel);
const providerRepository = new ProviderRepository(ParkingProviderModel)
const userusecase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,  
  nodemailer,
  requestValidator,
  otpRepository,
  providerRepository
);
const userAdapter = new UserAdapter(userusecase);

export { userAdapter, userRepository };