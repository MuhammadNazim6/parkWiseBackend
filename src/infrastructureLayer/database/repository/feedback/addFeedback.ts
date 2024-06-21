import { IFeedback } from "../../../../domainLayer/feedback";
import FeedbackModel from "../../model/feedbackModel";


export const addFeedback = async (
  feedbackModel: typeof FeedbackModel,
  parkingLotId: string,
  userId: string,
  rating: number,
  review: string
): Promise<IFeedback> => {
  try {
    const addedFeedback = await feedbackModel.create({ parkingLotId, userId, rating, review })
    console.log(addedFeedback);
    console.log('Feedback added');
    
    return addedFeedback
  } catch (error) {
    console.log(error);
    throw error
  }
}