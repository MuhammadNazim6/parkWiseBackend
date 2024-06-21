import { IFeedback } from "../../../domainLayer/feedback";
import { IFeedbackRepository } from "../../interface/repository/IFeedbackRepository";


export const getLotFeedbacks = async (
  feedbackRepository: IFeedbackRepository,
  lotId: string,
): Promise<IFeedback[]> => {
  try {
    const feedbacks = await feedbackRepository.getParkingFeedbacks(lotId)
    return feedbacks
  } catch (error) {
    throw error
  }
}
