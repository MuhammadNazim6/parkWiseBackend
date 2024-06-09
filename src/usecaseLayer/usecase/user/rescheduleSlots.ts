import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const rescheduleSlots = async (
  bookingRepository: IBookingRepository,
  bookingId: string,
  slots: Array<string>
): Promise<IBooking | null> => {
  try {
    const rescheduled = await bookingRepository.rescheduleBooking(bookingId,slots)
    return rescheduled
   
  } catch (error) {
    throw error
  }
}