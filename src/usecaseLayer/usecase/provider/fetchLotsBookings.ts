import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const fetchLotsBookings = async (
  bookingRepository: IBookingRepository,
  lotId: string,
  page: string
): Promise<{}> => {
  try {
    const bookings = await bookingRepository.getParkingLotBookings(lotId, page)
    return bookings
  } catch (error) {
    throw error
  }
}