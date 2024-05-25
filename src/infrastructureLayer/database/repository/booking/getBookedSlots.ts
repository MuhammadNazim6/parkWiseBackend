const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const getBookedSlots = async (
  bookingModel: typeof BookingModel,
  date: string,
  lotId: string
): Promise<{}[]> => {

  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1);
  const oneDayAddedDate = new Date(newDate).toISOString()

  const startOfDay = new Date(oneDayAddedDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(oneDayAddedDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const lotObjectId = new ObjectId(lotId);

  const bookedSlots = await bookingModel.aggregate([
    {
      $match: {
        parkingLotId: lotObjectId,
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
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
      $unwind: '$provider'
    },
    {
      $group: {
        _id: { fromTime: "$fromTime", toTime: "$toTime" },
        count: { $sum: 1 },
        availableSpace: { $first: "$provider.availableSpace" }
      },
    },
    {
      $match: {
        $expr: { $eq: ["$count", "$availableSpace"] },
      },
    },
    {
      $sort: { "_id.fromTime": 1 },
    },

  ]);
  const bookedSlotsObject = bookedSlots.map((x) => { return x._id.fromTime.slice(0, 2) + '-' + x._id.toTime.slice(0, 2) }).map(time => ({ time }))
  console.log(bookedSlotsObject);
  
  return bookedSlotsObject
}

