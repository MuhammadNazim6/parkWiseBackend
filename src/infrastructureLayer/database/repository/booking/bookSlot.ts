import { ISlotBooking } from "../../../../usecaseLayer/interface/repository/ICommonInterfaces";
import BookingModel from "../../model/bookingModel";

export const bookSlot = async (
  bookingModel: typeof BookingModel,
  bookingData: ISlotBooking
): Promise<boolean> => {
  try {
    const { lotId, userId, servicesChecked, fromTime, toTime, amount } = bookingData

    const bookedSlot = await bookingModel.create({ parkingLotId: lotId, userId, servicesUsed: servicesChecked, fromTime, toTime, amount })
    if (bookedSlot) return true;

    return false;
  } catch (error) {
    console.log(error);
    throw error

  }
}

// To be changed after createing a new booking
