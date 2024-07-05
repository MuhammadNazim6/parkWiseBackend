import { IBookingRepository } from "../../interface/repository/IBookingRepository"

export const fetchServicesCount = async (
  bookingRepository: IBookingRepository,
  provId: string
): Promise<{}> => {
  try {
    const servicesCount = await bookingRepository.fetchServicesCountForProvider(provId)
    return servicesCount
  } catch (error) {
    throw error
  }

}