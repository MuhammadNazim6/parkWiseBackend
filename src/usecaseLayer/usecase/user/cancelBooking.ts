import { IBooking } from "../../../domainLayer/booking";
import { userRepository } from "../../../infrastructureLayer/route/injections/userInjection";
import { IBookingRepository } from "../../interface/repository/IBookingRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";

export const cancelBooking = async (
  bookingRepository: IBookingRepository,
  userRepository: IUserRepository,
  bookingId: string
): Promise<IBooking | null> => {
  try {
    const cancelled = await bookingRepository.cancelBooking(bookingId)
    if (cancelled) {
      const refundedUser = await userRepository.refundCashToUser(cancelled.userId, cancelled.amount)
      return cancelled
    }

    return null
  } catch (error) {
    throw error
  }
}