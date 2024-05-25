import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IBookingRepository";
import { ISlotBooking } from "../../../usecaseLayer/interface/repository/ICommonInterfaces";
import BookingModel from "../model/bookingModel";
import { bookSlot } from "./booking/bookSlot";
import { getBookedSlots } from "./booking/getBookedSlots";

export class BookingRepository implements IBookingRepository {
  constructor(private readonly bookingModel: typeof BookingModel) {
  }
  async getBookedSlots(date: string, lotId: string): Promise<{}[]> {
    return getBookedSlots(this.bookingModel, date, lotId,);
  }
  async bookSlot(bookingData: ISlotBooking): Promise<boolean> {
    return bookSlot(this.bookingModel, bookingData);
  }
}

