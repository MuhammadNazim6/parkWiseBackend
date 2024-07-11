import BookingModel from "../../model/bookingModel";

export const fetchTotalBookingsTodayForAdmin = async (
  bookingModel: typeof BookingModel,
): Promise<number> => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await bookingModel.aggregate([
      {
        $match: {
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
    
    return result[0]?.totalBookingsToday ? result[0]?.totalBookingsToday : 0
  } catch (error) {
    throw error
  }
}
