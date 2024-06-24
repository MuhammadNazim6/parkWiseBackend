import { IFeedback } from "../../../domainLayer/feedback";
import { IFeedbackRepository } from "../../interface/repository/IFeedbackRepository";


export const editFeedback = async (
  feedbackRepository: IFeedbackRepository,
  userId: string,
  parkingLotId: string,
  rating: number,
  review: string
): Promise<IFeedback | null> => {
  try {
    const feedbackEdited = await feedbackRepository.editFeedback(userId, parkingLotId, rating, review)
    if (feedbackEdited) {
      return feedbackEdited
    }
    return null
  } catch (error) {
    throw error
  }
}
