import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const fetchLotsBookings = async (
  bookingRepository: IBookingRepository,
  lotId: string
): Promise<{}[]> => {
  try {
   const bookings = await bookingRepository.getParkingLotBookings(lotId)
    console.log(bookings);
    return bookings
  } catch (error) {
    throw error
  }
}