import mongoose from "mongoose";
import FeedbackModel from "../../model/feedbackModel";

export const findFeedback = async (
  feedbackModel: typeof FeedbackModel,
  parkingLotId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const parkingLotIdObj = new mongoose.Types.ObjectId(parkingLotId);
    const userIdObj = new mongoose.Types.ObjectId(userId);

    const feedback = await feedbackModel.findOne({ parkingLotId:parkingLotIdObj, userId:userIdObj })
    console.log(feedback);
    console.log('Feedback already exists for this person to this lot');

     return feedback !== null;

  } catch (error) {
    console.log(error);
    throw error
  }
}