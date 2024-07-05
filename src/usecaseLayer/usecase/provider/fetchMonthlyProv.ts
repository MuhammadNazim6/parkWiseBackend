import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchMonthlyProv = async (
  bookingRepository: IBookingRepository,
  provId:string
): Promise<{}[]> => {
  try {
    const monthlyData = await bookingRepository.fetchMonthlyForProv(provId)    
    return monthlyData
  } catch (error) {
    throw error
  }

}