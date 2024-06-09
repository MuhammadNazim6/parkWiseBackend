import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";


export const getFilledSlots = async (
  bookingRepository: IBookingRepository,
  bookingId: string
): Promise<{}> => {
  try {
    const booking = await bookingRepository.getBookingDetails(bookingId) as IBooking[]
    const lotIdStr = booking[0].parkingLotId.toString()

    const newDate = new Date(booking[0].bookingDate)
    newDate.setDate(newDate.getDate() - 1);
    const oneDayReducedDate = new Date(newDate).toISOString()

    const filled = await bookingRepository.getBookedSlots(oneDayReducedDate, lotIdStr) as Array<{ time: string }>
    
    return filled
  } catch (error) {
    throw error
  }
}