import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchDaily = async (
  bookingRepository: IBookingRepository,
): Promise<{}> => {
  try {
    const dailyData = await bookingRepository.fetchDailyForAdmin()    
    return dailyData
  } catch (error) {
    throw error
  }

}