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


const adminRepository = new AdminRepository(AdminModel);
const providerRepository = new ProviderRepository(ParkingProviderModel);
const userRepository = new UserRepository(UserModel);
const otpRepository = new OtpRepository(OtpModel);
const addressRepository = new AddressRepository(AddressModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const nodemailer = new Nodemailer();
const adminUseCase = new AdminUseCase(
  adminRepository,
  bcrypt,
  jwt,
  requestValidator
);

const providerUseCase = new ProviderUseCase(
  providerRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  otpRepository,
  addressRepository
)

const userUseCase = new UserUseCase(
  userRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator,
  otpRepository,
  providerRepository
)

const adminAdapter = new AdminAdapter(adminUseCase, providerUseCase, userUseCase);

export { adminAdapter, adminRepository };