import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const getBookingDetails = async (
  bookingId: string,
  bookingRepository: IBookingRepository
): Promise<{}> => {
  try {
    const bookingDetails = await bookingRepository.getBookingDetails(bookingId)
    return bookingDetails
  } catch (error) {
    throw error
  }
}