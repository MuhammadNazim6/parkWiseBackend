import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchDailyProv = async (
  bookingRepository: IBookingRepository,
  provId: string
): Promise<{}[]> => {
  try {
    const dailyData = await bookingRepository.fetchDailyForProv(provId)
    return dailyData
  } catch (error) {
    throw error
  }
}