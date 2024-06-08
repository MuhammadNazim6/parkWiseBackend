import { IBooking } from "../../../../domainLayer/booking";
import BookingModel from "../../model/bookingModel";


export const cancelBooking = async (
  bookingModel: typeof BookingModel,
  bookingId: string
): Promise<IBooking | null> => {
  try {
    const updatedBooking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { bookingStatus: 'cancelled' },
      { new: true }
    );

    if (updatedBooking) {
      console.log('Updated Booking:', updatedBooking);
      return updatedBooking;
    } else {
      console.log('No booking found with the given ID');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}