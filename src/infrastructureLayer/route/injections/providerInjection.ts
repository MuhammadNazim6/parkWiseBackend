import { ProviderAdapter } from "../../../controllerLayer/providerAdapter";
import { ProviderUseCase } from "../../../usecaseLayer/usecase/providerUseCase";
import ParkingProviderModel from "../../database/model/providerModel";
import OtpModel from "../../database/model/otpModel";
import { ProviderRepository } from "../../database/repository/providerRepository";
import { OtpRepository } from "../../database/repository/otpRepository";
import { AddressRepository } from "../../database/repository/addressRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import Nodemailer from "../../services/nodemailer";
import RequestValidator from "../../services/validateRepository";
import AddressModel from "../../database/model/addressModel";
import { BookingRepository } from "../../database/repository/bookingRepository";
import BookingModel from "../../database/model/bookingModel";
import S3Bucket from "../../services/s3BucketAws";


const providerRepository = new ProviderRepository(ParkingProviderModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const nodemailer = new Nodemailer();
const s3Bucket = new S3Bucket();
const requestValidator = new RequestValidator();
const otpRepository = new OtpRepository(OtpModel);
const addressRepository = new AddressRepository(AddressModel);
const bookingRepository = new BookingRepository(BookingModel);
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
);
const providerAdapter = new ProviderAdapter(providerUseCase);

export { providerAdapter, providerRepository };