import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchWeekly = async (
  bookingRepository: IBookingRepository,
): Promise<{}> => {
  try {
    const weeklyData = await bookingRepository.fetchWeeklyForAdmin()    
    return weeklyData
  } catch (error) {
    throw error
  }

}