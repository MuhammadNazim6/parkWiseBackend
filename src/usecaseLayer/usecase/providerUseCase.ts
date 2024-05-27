import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import { IOtpRepository } from "../interface/repository/IOtpRepository";
import { IAddressRepository } from "../interface/repository/IAddressRepository";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
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
import { fetchLotDetails } from "./provider/fetchLotDetails";
import { getBookedSlots } from "./provider/getBookedSlots";
import { ISlotBooking } from "../interface/repository/ICommonInterfaces";
import { bookSlot } from "./provider/bookSlot";

export class ProviderUseCase {
  private readonly providerRepository: IProviderRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly otpRepository: IOtpRepository;
  private readonly addressRepository: IAddressRepository;
  private readonly bookingRepository: IBookingRepository;

  constructor(
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    addressRepository: IAddressRepository,
    bookingRepository: IBookingRepository
  ) {
    this.providerRepository = providerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.addressRepository = addressRepository
    this.bookingRepository = bookingRepository
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
    console.log(enteredOtp);

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
    uploadedImageNames

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
    uploadedImageNames:string[];
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
      uploadedImageNames
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

  async fetchParkingLots({ coordinates, price, hasAirPressureCheck, hasEvCharging, hasWaterService, page, limit }: IFetchParkingLot) {
    return fetchParkingLots(
      this.providerRepository,
      {
        coordinates,
        price,
        hasAirPressureCheck,
        hasEvCharging,
        hasWaterService,
        page,
        limit
      }
    )
  }

  async fetchLotDetails(lotId: string) {
    return fetchLotDetails(
      this.providerRepository,
      lotId
    )
  }

  async getBookedSlots({ date, lotId }: { date: string, lotId: string }) {
    console.log('DAte', date);

    return getBookedSlots(
      this.bookingRepository,
      this.providerRepository,
      date,
      lotId
    )
  }

  async bookSlot({ lotId, userId, servicesChecked, fromTime, toTime, amount }: ISlotBooking) {
    return bookSlot(
      this.bookingRepository,
      { lotId, userId, servicesChecked, fromTime, toTime, amount }
    )
  }


}        