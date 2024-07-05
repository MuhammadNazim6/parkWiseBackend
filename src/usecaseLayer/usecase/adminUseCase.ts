import { IAdmin } from "../../domainLayer/admin";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IAdminRepsitory } from "../interface/repository/IAdminRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { IBookingRepository } from "../interface/repository/IBookingRepository";
import { fetchServicesCount } from "./admin/fetchServicesCount";
import { fetchTotalBookingsToday } from "./admin/fetchTotalBookingsToday";
import { fetchMonthly } from "./admin/fetchMonthly";
import { fetchWeekly } from "./admin/fetchWeekly";
import { fetchDaily } from "./admin/fetchDaily";


export class AdminUseCase {
  private readonly adminRepository: IAdminRepsitory;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;
  private readonly bookingRepository: IBookingRepository;


  constructor(
    adminRepository: IAdminRepsitory,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator,
    bookingRepository:IBookingRepository
    
  ) {
    this.adminRepository = adminRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
    this.bookingRepository = bookingRepository;
  }


  async fetchServicesCount() {
    return fetchServicesCount(
      this.bookingRepository,
    )
  }

  async fetchTotalBookingsToday() {
    return fetchTotalBookingsToday(
      this.bookingRepository,
    )
  }

  async fetchMonthly() {
    return fetchMonthly(
      this.bookingRepository,
    )
  }

  async fetchWeekly() {
    return fetchWeekly(
      this.bookingRepository,
    )
  }

  async fetchDaily() {
    return fetchDaily(
      this.bookingRepository,
    )
  }
}
