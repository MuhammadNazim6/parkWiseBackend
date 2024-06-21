import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const getUserBookingCount = async (
  bookingRepository: IBookingRepository,
  userId: string,
): Promise<Number> => {
  try {    
    const count = await bookingRepository.getUserBookingCount(userId)    
    return count
  } catch (error) {
    throw error
  }
}