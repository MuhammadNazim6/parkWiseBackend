const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const getParkingLotBookings = async (
  bookingModel: typeof BookingModel,
  lotId: string,
  page: string
): Promise<{}> => {
  try {
    const lotObjectId = new ObjectId(lotId);
    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit;

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
      },
      {
        $skip: skip
      },
      {
        $limit: limit
      }
    ])

    const totalBookings = await bookingModel.countDocuments({ parkingLotId: lotObjectId });

    const totalPages = Math.ceil(totalBookings / limit);
    const data = {
      bookings,
      totalPages
    }
    return data
  } catch (error) {
    throw error
  }
}

