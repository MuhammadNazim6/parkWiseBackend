import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchWeeklyProv = async (
  bookingRepository: IBookingRepository,
  provId:string
): Promise<{}[]> => {
  try {
    const weeklyData = await bookingRepository.fetchWeeklyForProv(provId)    
    return weeklyData
  } catch (error) {
    throw error
  }

}