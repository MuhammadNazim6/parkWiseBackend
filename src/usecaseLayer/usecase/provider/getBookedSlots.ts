import { IBookingRepository } from "../../interface/repository/IBookingRepository"
import { IProviderRepository } from "../../interface/repository/IProviderRepository";
export const getBookedSlots = async (
  bookingRepository: IBookingRepository,
  providerRepository: IProviderRepository,
  date: string,
  lotId: string
): Promise<{}[]> => {
  try {
    const bookedSlots = await bookingRepository.getBookedSlots(date, lotId)
    
    return bookedSlots
  } catch (error) {
    throw error
  }

}