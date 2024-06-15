import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const fetchLotsBookings = async (
  bookingRepository: IBookingRepository,
  lotId: string
): Promise<{}[]> => {
  try {
   const bookings = await bookingRepository.getParkingLotBookings(lotId)
    return bookings
  } catch (error) {
    throw error
  }
}