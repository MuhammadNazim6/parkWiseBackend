import { IBookingRepository } from "../../interface/repository/IBookingRepository"
import { ISlotBooking } from "../../interface/repository/ICommonInterfaces"

export const bookSlot = async (
  bookingRepository: IBookingRepository,
  bookingdata: ISlotBooking
): Promise<{}> => {
  try {
    const bookedSlots = await bookingRepository.bookSlot(bookingdata)
    return bookedSlots
  } catch (error) {
    throw error
  }

}