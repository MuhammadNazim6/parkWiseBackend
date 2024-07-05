const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const fetchMonthlyForProv = async (
  bookingModel: typeof BookingModel,
  provId: string
): Promise<{}[]> => {
  try {
    const provObjId = new ObjectId(provId);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);

    const results = await bookingModel.aggregate([
      {
        $match: {
          parkingLotId: provObjId,
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
          amount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          _id: 0,
          name: {
            $arrayElemAt: [
              [
                "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
              ],
              "$_id"
            ]
          },
          count: 1,
          amount: 1
        }
      }
    ])

    console.log(results);
    return results
  } catch (error) {
    throw error
  }
}
