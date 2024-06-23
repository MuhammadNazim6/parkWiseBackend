import { IFeedback } from "../../../../domainLayer/feedback";
import FeedbackModel from "../../model/feedbackModel";
import mongoose from "mongoose";


export const editFeedback = async (
  feedbackModel: typeof FeedbackModel,
  userId: string,
  parkingLotId: string,
  rating: number,
  review: string
): Promise<IFeedback | null> => {
  try {
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const parkingLotIdObj = new mongoose.Types.ObjectId(parkingLotId);

    const updatedFeedback = await feedbackModel.findOneAndUpdate(
      { userId: userIdObj, parkingLotId: parkingLotIdObj },
      { $set: { rating, review } },
      { new: true }
    )
    return updatedFeedback

  } catch (error) {
    console.log(error);
    throw error
  }
}