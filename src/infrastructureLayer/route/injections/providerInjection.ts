import { ProviderAdapter } from "../../../controllerLayer/providerAdapter";
import { ProviderUseCase } from "../../../usecaseLayer/usecase/providerUseCase";
import ParkingProviderModel from "../../database/model/providerModel";
import OtpModel from "../../database/model/otpModel";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { OtpRepository } from "../../database/repository/otpRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";


const providerRepository = new ProviderRepository(ParkingProviderModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const otpRepository = new OtpRepository(OtpModel);
const providerUseCase = new ProviderUseCase(
  providerRepository,
  bcrypt,
  jwt,  
  nodemailer,
  requestValidator,
  otpRepository
);
const providerAdapter = new ProviderAdapter(providerUseCase);

export { providerAdapter, providerRepository };