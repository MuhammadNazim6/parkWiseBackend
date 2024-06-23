import mongoose from "mongoose";
import FeedbackModel from "../../model/feedbackModel";
import { IFeedback } from "../../../../domainLayer/feedback";

export const getParkingFeedbacks = async (
  feedbackModel: typeof FeedbackModel,
  parkingLotId: string,
): Promise<IFeedback[]> => {
  try {
    const parkingLotIdObj = new mongoose.Types.ObjectId(parkingLotId);
    const feedbacks = await feedbackModel.find({ parkingLotId: parkingLotIdObj }).populate('userId')
    
    return feedbacks

  } catch (error) {
    console.log(error);
    throw error
  }
}