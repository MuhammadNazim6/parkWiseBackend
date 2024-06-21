const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const fetchUserBookings = async (
  bookingModel: typeof BookingModel,
  userId: string,
  page: string
): Promise<{}> => {
  try {

    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit
    const userObjId = new ObjectId(userId);

    const result = await bookingModel.aggregate([
      {
        $match: {
          userId: userObjId
        }
      },
      {
        $facet: {
          paginatedResults: [
            {
              $lookup: {
                from: 'providers',
                localField: 'parkingLotId',
                foreignField: '_id',
                as: 'provider'
              }
            },
            {
              $unwind: '$provider'
            },
            {
              $sort: { '_id': -1 }
            },
            {
              $skip: skip
            },
            {
              $limit: limit
            }
          ],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]);

    const totalCount = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);
    const bookings = result[0].paginatedResults;

    return { bookings, totalPages };
  } catch(error) {
    throw error
  }
}
