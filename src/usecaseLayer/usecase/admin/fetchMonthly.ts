import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchMonthly = async (
  bookingRepository: IBookingRepository,
): Promise<{}> => {
  try {
    const monthlyData = await bookingRepository.fetchMonthlyForAdmin()    
    return monthlyData
  } catch (error) {
    throw error
  }

}