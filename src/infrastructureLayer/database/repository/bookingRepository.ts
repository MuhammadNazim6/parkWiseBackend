import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IBookingRepository";
import { ISlotBooking } from "../../../usecaseLayer/interface/repository/ICommonInterfaces";
import BookingModel from "../model/bookingModel";
import { bookSlot } from "./booking/bookSlot";
import { cancelBooking } from "./booking/cancelBooking";
import { fetchUserBookings } from "./booking/fetchUserBookings";
import { getBookedSlots } from "./booking/getBookedSlots";
import { getBookingDetails } from "./booking/getBookingDetails";
import { getParkingLotBookings } from "./booking/getParkingLotBookings";

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
  async getParkingLotBookings(lotId: string): Promise<{}[]> {
    return getParkingLotBookings(this.bookingModel, lotId);
  }
  async fetchUserBookings(userId: string, page: string): Promise<{}> {
    return fetchUserBookings(this.bookingModel, userId, page);
  }   
  async cancelBooking(bookingId: string): Promise<IBooking | null> {
    return cancelBooking(this.bookingModel, bookingId);
  }
}
 
