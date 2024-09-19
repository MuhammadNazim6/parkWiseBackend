import BookingModel from "../../model/bookingModel";

export const checkIsAllowedToRate = async (
  bookingModel: typeof BookingModel,
  userId: string,
  lotId: string
): Promise<boolean> => {
  try {
    const result = await bookingModel.findOne({userId, parkingLotId:lotId,bookingStatus:'booked'})    
    return !!result;  
  } catch(error) {
    throw error
  }
}
 