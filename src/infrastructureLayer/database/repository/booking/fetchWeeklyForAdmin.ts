import BookingModel from "../../model/bookingModel";

export const fetchWeeklyForAdmin = async (
  bookingModel: typeof BookingModel,
): Promise<{}[]> => {
  try {
    const startOfLast7Weeks = new Date();
    startOfLast7Weeks.setDate(startOfLast7Weeks.getDate() - (7 * 7));
    startOfLast7Weeks.setHours(0, 0, 0, 0);

    const results = await bookingModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfLast7Weeks }
        }
      },
      {
        $group: {
          _id: {
            isoWeekYear: { $isoWeekYear: "$createdAt" },
            isoWeek: { $isoWeek: "$createdAt" }
          },
          count: { $sum: 1 },
          amount: { $sum: "$amount" },
          minDate: { $min: "$createdAt" },
          maxDate: { $max: "$createdAt" }
        }
      },
      {
        $sort: { "_id.isoWeekYear": 1, "_id.isoWeek": 1 }
      },
      {
        $limit: 7
      },
      {
        $project: {
          _id: 0,
          name: {
            $concat: [

              { $dateToString: { format: "%Y/%m/%d", date: "$minDate" } },
              " - ",
              { $dateToString: { format: "%d", date: "$maxDate" } },
            ]
          },
          count: "$count",
          amount: "$amount"
        }
      }
    ])
    console.log(results);
   
    return results
  } catch (error) {
    throw error
  }
}
