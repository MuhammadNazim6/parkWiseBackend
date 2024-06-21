import { IBooking } from "../../../domainLayer/booking";
import { ISlotBooking } from "./ICommonInterfaces";

export interface IBookingRepository {
  getBookedSlots(date: string, lotId: string): Promise<{}[]>
  bookSlot(bookingData: ISlotBooking): Promise<{}>
  getBookingDetails(bookingId: string): Promise<{}>
  getParkingLotBookings(lotId: string): Promise<{}[]>
  fetchUserBookings(userId: string, page: string): Promise<{}>
  cancelBooking(bookingId: string): Promise<IBooking | null>
  rescheduleBooking(bookingId: string, slots: Array<string>): Promise<IBooking | null>
  getUserBookingCount(userId: string): Promise<Number>
}