import { IParkingProviderReady } from "../../../domainLayer/providers";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IS3Bucket } from "../../interface/services/IS3Bucket";

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