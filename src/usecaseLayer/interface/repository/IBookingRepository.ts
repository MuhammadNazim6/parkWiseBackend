import { IBooking } from "../../../domainLayer/booking";
import { ISlotBooking } from "./ICommonInterfaces";

export interface IBookingRepository {
  getBookedSlots(date: string, lotId: string): Promise<{}[]>
  bookSlot(bookingData: ISlotBooking): Promise<{}>
}