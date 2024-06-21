import { IFeedbackRepository } from "../../interface/repository/IFeedbackRepository";


export const deleteFeedback = async (
  feedbackRepository: IFeedbackRepository,
  userId: string,
  feedbackId: string
): Promise<boolean> => {
  try {
    const feedbackDeleted = await feedbackRepository.deleteFeedback(feedbackId, userId)
    return feedbackDeleted ? true : false
  } catch (error) {
    throw error
  }
}
