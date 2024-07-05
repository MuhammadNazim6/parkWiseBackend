import BookingModel from "../../model/bookingModel";


export const getUserBookingCount = async (
  bookingModel: typeof BookingModel,
  userId: string
): Promise<Number> => {
  try {
    const count = await bookingModel.countDocuments({ userId }, { bookingStatus: 'booked' })    
    return count

  } catch (error) {
    throw error
  }
}