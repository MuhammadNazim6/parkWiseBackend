import { ProviderAdapter } from "../../../controllerLayer/providerAdapter";
import { ProviderUseCase } from "../../../usecaseLayer/usecase/providerUseCase";
import ParkingProviderModel from "../../database/model/providerModel";
import { ProviderRepository } from "../../database/repository/providerRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";


const providerRepository = new ProviderRepository(ParkingProviderModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const providerUseCase = new ProviderUseCase(
  providerRepository,
  bcrypt,
  jwt,  
  // nodemailer,
  requestValidator
);
const providerAdapter = new ProviderAdapter(providerUseCase);

export { providerAdapter, providerRepository };