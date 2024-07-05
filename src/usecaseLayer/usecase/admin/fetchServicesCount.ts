import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchServicesCount = async (
  bookingRepository: IBookingRepository,
): Promise<{}> => {
  try {
    const servicesCount = await bookingRepository.fetchServicesCountForAdmin()    
    return servicesCount
  } catch (error) {
    throw error
  }

}