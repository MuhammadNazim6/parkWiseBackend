const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const fetchTodaysBookingCountProv = async (
  bookingModel: typeof BookingModel,
  provId: string
): Promise<number> => {
  try {
    const provObjId = new ObjectId(provId);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
 
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await bookingModel.aggregate([
      {
        $match: {
          parkingLotId:provObjId,
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        }
      },
      {
        $count: "totalBookingsToday"
      }
    ]);
    console.log('TOTOAL COUNT');
    console.log(result);
    
    return result[0].totalBookingsToday
  } catch (error) {
    throw error
  }
}
