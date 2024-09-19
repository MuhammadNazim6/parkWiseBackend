import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const checkIsAllowedToRate = async (
  bookingRepository: IBookingRepository,
  userId: string,
  lotId:string
): Promise<boolean> => {
  try {
    const isAllowed = await bookingRepository.checkIsAllowedToRate(userId,lotId)
    return isAllowed

  } catch (error) {
    throw error
  }
}
