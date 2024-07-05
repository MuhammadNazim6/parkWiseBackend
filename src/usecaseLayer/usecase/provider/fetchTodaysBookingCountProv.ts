import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchTodaysBookingCountProv = async (
  bookingRepository: IBookingRepository,
  provId: string
): Promise<number> => {
  try {
    const count = await bookingRepository.fetchTodaysBookingCountProv(provId)
    console.log(count);

    return count
  } catch (error) {
    throw error
  }

}