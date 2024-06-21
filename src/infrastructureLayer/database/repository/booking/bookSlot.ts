import { ISlotBooking } from "../../../../usecaseLayer/interface/repository/ICommonInterfaces";
import BookingModel from "../../model/bookingModel";

export const bookSlot = async (
  bookingModel: typeof BookingModel,
  bookingData: ISlotBooking
): Promise<{}> => {
  try {
    const { lotId, userId, services, selectedSlots, amount, bookingDate } = bookingData
    const correctedDate = new Date(bookingDate)
    correctedDate.setDate(correctedDate.getDate() + 1);

    const bookedSlot = await bookingModel.create({ parkingLotId: lotId, userId, servicesUsed: services, selectedSlots, amount, bookingDate: correctedDate })

    const populatedBooking = await bookingModel
      .findById(bookedSlot._id)
      .populate('userId')
      .populate('parkingLotId');

    if (populatedBooking) return populatedBooking;
    return false;
  } catch (error) {
    console.log(error);
    throw error
  }
}
