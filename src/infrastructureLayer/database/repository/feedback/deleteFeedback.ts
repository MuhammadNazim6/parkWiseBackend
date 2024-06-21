import FeedbackModel from "../../model/feedbackModel";
import mongoose from "mongoose";


export const deleteFeedback = async (
  feedbackModel: typeof FeedbackModel,
  feedbackId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const feedbackIdObj = new mongoose.Types.ObjectId(feedbackId);
    const userIdObj = new mongoose.Types.ObjectId(userId);

    const deleted = await feedbackModel.deleteOne({ _id: feedbackIdObj, userId: userIdObj })
    return deleted.deletedCount === 1;

  } catch (error) {
    console.log(error);
    throw error
  }
}