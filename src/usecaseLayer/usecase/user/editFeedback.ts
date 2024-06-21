import { IFeedback } from "../../../domainLayer/feedback";
import { IFeedbackRepository } from "../../interface/repository/IFeedbackRepository";


export const editFeedback = async (
  feedbackRepository: IFeedbackRepository,
  feedbackId: string,
  rating: number,
  review: string
): Promise<IFeedback | null> => {
  try {
    const feedbackEdited = await feedbackRepository.editFeedback(feedbackId, rating, review)
    if (feedbackEdited) {
      return feedbackEdited
    }
    return null
  } catch (error) {
    throw error
  }
}
