const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const getParkingLotBookings = async (
  bookingModel: typeof BookingModel,
  lotId: string
): Promise<{}[]> => {
  try{
    const lotObjectId = new ObjectId(lotId);
    const bookings = await bookingModel.aggregate([
      {
        $match: {
          parkingLotId: lotObjectId
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
      
    return bookings
  }catch(error){
    throw error
  }
}

