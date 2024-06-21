const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const getBookedSlots = async (
  bookingModel: typeof BookingModel,
  date: string,
  lotId: string
): Promise<{}[]> => {
  try {
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
          bookingDate: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
          bookingStatus: 'booked'
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
        $unwind: "$selectedSlots"
      },
      {
        $group: {
          _id: { time: "$selectedSlots" },
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
        $sort: { "_id.time": 1 },
      },

    ]);
    const bookedSlotsObject = bookedSlots.map((x) => {
      const time = x._id.time
      return parseInt(time.slice(0, 2)) + '-' + (parseInt(time.slice(0, 2)) + 1).toString()
    }).map(time => ({ time }))

    return bookedSlotsObject
  } catch (error) {
    throw error
  }

}

