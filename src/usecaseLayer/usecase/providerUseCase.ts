import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import { IAddressRepository } from "../interface/repository/IAddressRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";
import { createProvider } from "./provider/createProvider";
import { sendOtpProvider } from './provider/sendOtpProvider';
import { checkOtpCommon } from "./user/otpRelated";
import { sendLotForApproval } from "./provider/sendLotForApproval";
import { getRequests } from "./provider/getRequests";
import { getApprovedProviders } from "./provider/getApprovedProviders";
import { blockUnblockProvider } from "./provider/blockUnblockProvider";
import { acceptRequest, declineRequest } from "./provider/manageRequest";
import { fetchParkingLots } from "./provider/fetchParkingLots";
import { IFetchParkingLot } from "../../domainLayer/providers";

export class ProviderUseCase {
  private readonly providerRepository: IProviderRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly otpRepository: IOtpRepository;
  private readonly addressRepository: IAddressRepository;

  constructor(
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    addressRepository: IAddressRepository
  ) {
    this.providerRepository = providerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.addressRepository = addressRepository
  }

  // provider register
  async createProvider({
    name,
    email,
    password,
    mobile
  }: {
    email: string,
    password: string,
    name: string,
    mobile: number
  }) {
    return createProvider(
      this.requestValidator,
      this.providerRepository,
      this.bcrypt,
      this.jwt,
      name,
      mobile,
      email,
      password
    )
  }


  // sending otp to provider
  async sendOtpProvider({
    email,
    name
  }: {
    email: string,
    name: string
  }) {
    return sendOtpProvider(
      this.requestValidator,
      this.providerRepository,
      this.otpRepository,
      email,
      name
    )
  }


  // checking otp of provider
  async checkOtpProvider({
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



  // send Lot For Approval
  async sendLotForApproval({
    email,
    parkingName,
    parkingCount,
    waterServicePrice,
    evChargeFacilityPrice,
    airPressureCheckPrice,
    oneHourParkingAmount,
    latitude,
    longitude,
    startEndTime,
    buildingOrAreaName,
    street,
    city,
    state,
    landmark,
    country,
    pinNumber,

  }: {
    email: string,
    parkingName: string;
    parkingCount: number;
    waterServicePrice: number;
    evChargeFacilityPrice: number;
    airPressureCheckPrice: number;
    oneHourParkingAmount: number;
    latitude: number,
    longitude: number,
    startEndTime: string;
    buildingOrAreaName: string;
    street: string;
    city: string;
    state: string;
    landmark: string;
    country: string;
    pinNumber: number;
  }) {
    return sendLotForApproval(
      this.providerRepository,
      this.addressRepository,
      email,
      parkingName,
      parkingCount,
      waterServicePrice,
      evChargeFacilityPrice,
      airPressureCheckPrice,
      oneHourParkingAmount,
      latitude,
      longitude,
      startEndTime,
      buildingOrAreaName,
      street,
      city,
      state,
      landmark,
      country,
      pinNumber,
    )
  }


  // fetch providers requests
  async getRequests() {
    return getRequests(
      this.providerRepository
    )
  }
  async getApprovedProviders() {
    return getApprovedProviders(
      this.providerRepository
    )
  }

  async blockUnblockProvider({
    email,
  }: {
    email: string
  }) {
    return blockUnblockProvider(
      this.providerRepository,
      email
    )
  }

  async acceptRequest({
    id,
  }: {
    id: string
  }) {
    return acceptRequest(
      this.providerRepository,
      id
    )
  }

  async rejectRequest({
    id,
  }: {
    id: string
  }) {
    return declineRequest(
      this.providerRepository,
      id
    )
  }

  async fetchParkingLots({ coordinates, price, hasAirPressureCheck, hasEvCharging, hasWaterService, page, limit}: IFetchParkingLot) {

    console.log('coordinates here');
    console.log(coordinates);
    
    return fetchParkingLots(
      this.providerRepository,
      {coordinates,
      price,
      hasAirPressureCheck,
      hasEvCharging,
      hasWaterService,
      page,
      limit}
    )
  }

}        