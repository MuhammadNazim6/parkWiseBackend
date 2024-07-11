import BookingModel from "../../model/bookingModel";

export const fetchDailyForAdmin = async (
  bookingModel: typeof BookingModel,
): Promise<{}[]> => {
  try {
    const startOfLast10Days = new Date();
    startOfLast10Days.setDate(startOfLast10Days.getDate() - 10);
    startOfLast10Days.setHours(0, 0, 0, 0);

    const results = await BookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLast10Days }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 },
          amount: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      },
      {
        $project: {
          _id: 0,
          name: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day"
                }
              }
            }
          },
          count: "$count",
          amount: "$amount"
        }
      }
    ])
    
    return results
  } catch (error) {
    throw error
  }
}
