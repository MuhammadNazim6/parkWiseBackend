import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const fetchUserBookings = async (
  bookingRepository: IBookingRepository,
  userId: string,
  page:string
): Promise<{}> => {
  try {
    const bookings = await bookingRepository.fetchUserBookings(userId,page)    
    return bookings
  } catch (error) {
    throw error
  }
}