const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const getBookingDetails = async (
  bookingModel: typeof BookingModel,
  bookingId: string
): Promise<{}> => {
  try{
    const bookingObjId = new ObjectId(bookingId);
    const details = await bookingModel.aggregate([
      {
        $match: {
          _id: bookingObjId
        }
      },
      {
        $lookup: {
          from: 'providers',
          localField: 'parkingLotId',
          foreignField: '_id',
          as: 'provider'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$provider'
      },
      {
        $unwind: '$user'
      }
    ])
  
    return details
  }catch(error){
    throw error
  }
}
