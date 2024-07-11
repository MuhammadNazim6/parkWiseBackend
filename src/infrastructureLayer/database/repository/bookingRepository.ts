import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IBookingRepository";
import { ISlotBooking } from "../../../usecaseLayer/interface/repository/ICommonInterfaces";
import BookingModel from "../model/bookingModel";
import { bookSlot } from "./booking/bookSlot";
import { cancelBooking } from "./booking/cancelBooking";
import { fetchDailyForAdmin } from "./booking/fetchDailyForAdmin";
import { fetchDailyForProv } from "./booking/fetchDailyForProv";
import { fetchMonthlyForAdmin } from "./booking/fetchMonthlyForAdmin";
import { fetchMonthlyForProv } from "./booking/fetchMonthlyForProv";
import { fetchServicesCountForAdmin } from "./booking/fetchServicesCountForAdmin";
import { fetchServicesCountForProvider } from "./booking/fetchServicesCountForProvider";
import { fetchTodaysBookingCountProv } from "./booking/fetchTodaysBookingCountProv";
import { fetchTotalBookingsTodayForAdmin } from "./booking/fetchTotalBookingsTodayForAdmin";
import { fetchUserBookings } from "./booking/fetchUserBookings";
import { fetchWeeklyForAdmin } from "./booking/fetchWeeklyForAdmin";
import { fetchWeeklyForProv } from "./booking/fetchWeeklyForProv";
import { getBookedSlots } from "./booking/getBookedSlots";
import { getBookingDetails } from "./booking/getBookingDetails";
import { getParkingLotBookings } from "./booking/getParkingLotBookings";
import { getUserBookingCount } from "./booking/getUserBookingCount";
import { rescheduleBooking } from "./booking/rescheduleBooking";

export class BookingRepository implements IBookingRepository {
  constructor(private readonly bookingModel: typeof BookingModel) {
  }
  async getBookedSlots(date: string, lotId: string): Promise<{}[]> {
    return getBookedSlots(this.bookingModel, date, lotId,);
  }
  async bookSlot(bookingData: ISlotBooking): Promise<{}> {
    return bookSlot(this.bookingModel, bookingData);
  }
  async getBookingDetails(bookingId: string): Promise<{}> {
    return getBookingDetails(this.bookingModel, bookingId);
  }
  async getParkingLotBookings(lotId: string, page: string): Promise<{}> {
    return getParkingLotBookings(this.bookingModel, lotId, page);
  }
  async fetchUserBookings(userId: string, page: string): Promise<{}> {
    return fetchUserBookings(this.bookingModel, userId, page);
  }
  async cancelBooking(bookingId: string): Promise<IBooking | null> {
    return cancelBooking(this.bookingModel, bookingId);
  }
  async rescheduleBooking(bookingId: string, slots: Array<string>): Promise<IBooking | null> {
    return rescheduleBooking(this.bookingModel, bookingId, slots);
  }
  async getUserBookingCount(userId: string): Promise<Number> {
    return getUserBookingCount(this.bookingModel, userId);
  }
  async fetchServicesCountForAdmin(): Promise<{}> {
    return fetchServicesCountForAdmin(this.bookingModel);
  }
  async fetchTotalBookingsTodayForAdmin(): Promise<number> {
    return fetchTotalBookingsTodayForAdmin(this.bookingModel);
  }
  async fetchMonthlyForAdmin(): Promise<{}[]> {
    return fetchMonthlyForAdmin(this.bookingModel);
  }
  async fetchWeeklyForAdmin(): Promise<{}[]> {
    return fetchWeeklyForAdmin(this.bookingModel);
  }
  async fetchDailyForAdmin(): Promise<{}[]> {
    return fetchDailyForAdmin(this.bookingModel);
  }

  //
  async fetchServicesCountForProvider(provId: string): Promise<{}> {
    return fetchServicesCountForProvider(this.bookingModel, provId);
  }
  async fetchTodaysBookingCountProv(provId: string): Promise<number> {
    return fetchTodaysBookingCountProv(this.bookingModel, provId);
  }
  async fetchMonthlyForProv(provId: string): Promise<{}[]> {
    return fetchMonthlyForProv(this.bookingModel, provId);
  }
  async fetchWeeklyForProv(provId: string): Promise<{}[]> {
    return fetchWeeklyForProv(this.bookingModel, provId);
  }
  async fetchDailyForProv(provId: string): Promise<{}[]> {
    return fetchDailyForProv(this.bookingModel, provId);
  }




}
