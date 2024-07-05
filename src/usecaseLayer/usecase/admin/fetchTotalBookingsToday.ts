import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchTotalBookingsToday = async (
  bookingRepository: IBookingRepository,
): Promise<number> => {
  try {
    const count = await bookingRepository.fetchTotalBookingsTodayForAdmin()
    console.log(count);
    
    return count
  } catch (error) {
    throw error
  }

}