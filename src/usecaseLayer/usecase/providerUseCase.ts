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
import { ISlotBooking, IUpdateParkingLot } from "../interface/repository/ICommonInterfaces";
import { bookSlot } from "./provider/bookSlot";
import { IS3Bucket } from "../interface/services/IS3Bucket";
import { IFile } from "../../infrastructureLayer/middleware/multer";
import { IProvUpdateProfile } from "../../infrastructureLayer/types/providerTypes";
import { updateProvProfile } from "./provider/updateProvProfile";
import { fetchLotsBookings } from "./provider/fetchLotsBookings";
import { checkProvPassword } from "./provider/checkProvPassword";
import { updateParkingLotDetails } from "./provider/updateParkingLotDetails";
import { fetchServicesCount } from "./provider/fetchServicesCount";
import { getProvProfile } from "./provider/getProvProfile";
import { fetchTodaysBookingCountProv } from "./provider/fetchTodaysBookingCountProv";
import { fetchMonthlyProv } from "./provider/fetchMonthlyProv";
import { fetchWeeklyProv } from "./provider/fetchWeeklyProv";
import { fetchDailyProv } from "./provider/fetchDailyProv";
import { IUserRepository } from "../interface/repository/IUserRepository";
import { IAdminRepsitory } from "../interface/repository/IAdminRepository";

export class ProviderUseCase {
  private readonly providerRepository: IProviderRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator;
  private readonly otpRepository: IOtpRepository;
  private readonly addressRepository: IAddressRepository;
  private readonly bookingRepository: IBookingRepository;
  private readonly s3Bucket: IS3Bucket;
  private readonly userRepository: IUserRepository;
  private readonly adminRepository: IAdminRepsitory;

  constructor(
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
    otpRepository: IOtpRepository,
    addressRepository: IAddressRepository,
    bookingRepository: IBookingRepository,
    s3Bucket: IS3Bucket,
    userRepository: IUserRepository,
    adminRepository: IAdminRepsitory,


  ) {
    this.providerRepository = providerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.otpRepository = otpRepository;
    this.addressRepository = addressRepository;
    this.bookingRepository = bookingRepository;
    this.s3Bucket = s3Bucket;
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
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
      this.userRepository,
      this.adminRepository,
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
  }, files: IFile[]) {
    return sendLotForApproval(
      this.providerRepository,
      this.addressRepository,
      this.s3Bucket,
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
      files
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
      this.s3Bucket,
      lotId
    )
  }

  async getBookedSlots({ date, lotId }: { date: string, lotId: string }) {
    return getBookedSlots(
      this.bookingRepository,
      this.providerRepository,
      date,
      lotId
    )
  }

  async bookSlot({ lotId, userId, services, selectedSlots, amount, bookingDate }: ISlotBooking) {
    return bookSlot(
      this.bookingRepository,
      { lotId, userId, services, selectedSlots, amount, bookingDate }
    )
  }

  async updateProvProfile(lotId: string, toUpdate: IProvUpdateProfile) {
    return updateProvProfile(
      this.providerRepository,
      lotId,
      toUpdate
    )
  }
  async fetchLotsBookings(lotId: string) {
    return fetchLotsBookings(
      this.bookingRepository,
      lotId
    )
  }

  async checkProvPassword(provId: string, password: string) {
    return checkProvPassword(
      this.providerRepository,
      this.bcrypt,
      provId,
      password
    )
  }

  async updateParkingLotDetails(body: IUpdateParkingLot, files: IFile[]) {
    return updateParkingLotDetails(
      this.providerRepository,
      this.s3Bucket,
      body,
      files
    )
  }

  async fetchServicesCount(provId:string) {
    return fetchServicesCount(
      this.bookingRepository,
      provId
    )
  }

  async getProvProfile(provId:string) {
    return getProvProfile(
      this.providerRepository,
      provId
    )
  }

  async fetchTodaysBookingCountProv(provId:string) {
    return fetchTodaysBookingCountProv(
      this.bookingRepository,
      provId
    )
  }

  async fetchMonthlyProv(provId:string) {
    return fetchMonthlyProv(
      this.bookingRepository,
      provId
    )
  }

  async fetchWeeklyProv(provId:string) {
    return fetchWeeklyProv(
      this.bookingRepository,
      provId
    )
  }

  async fetchDailyProv(provId:string) {
    return fetchDailyProv(
      this.bookingRepository,
      provId
    )
  }

}        