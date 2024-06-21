import { IFeedback } from "../../../../domainLayer/feedback";
import FeedbackModel from "../../model/feedbackModel";
import mongoose from "mongoose";


export const editFeedback = async (
  feedbackModel: typeof FeedbackModel,
  feedbackId: string,
  rating: number,
  review: string
): Promise<IFeedback | null> => {
  try {
    const feedbackIdObj = new mongoose.Types.ObjectId(feedbackId);

    const updatedFeedback = await feedbackModel.findOneAndUpdate(
      { _id: feedbackIdObj },
      { $set: { rating, review } },
      { new: true }
    )
    return updatedFeedback

  } catch (error) {
    console.log(error);
    throw error
  }
}