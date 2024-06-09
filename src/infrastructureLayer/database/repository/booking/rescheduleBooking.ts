import { IBooking } from "../../../../domainLayer/booking";
import BookingModel from "../../model/bookingModel";

export const rescheduleBooking = async (
  bookingModel: typeof BookingModel,
  bookingId: string,
  slots: Array<string>
): Promise<IBooking | null> => {
  try {
    const updated = await bookingModel.findByIdAndUpdate(
      bookingId,
      {
        $set: { selectedSlots: slots },
      },
      { new: true }
    )
    if (updated) {
      return updated
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}