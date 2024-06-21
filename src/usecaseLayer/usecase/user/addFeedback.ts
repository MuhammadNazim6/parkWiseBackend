import { IFeedback } from "../../../domainLayer/feedback";
import { IAddFeedback } from "../../interface/repository/ICommonInterfaces";
import { IFeedbackRepository } from "../../interface/repository/IFeedbackRepository";


export const addFeedback = async (
  feedbackRepository: IFeedbackRepository,
  data: IAddFeedback
): Promise<IFeedback | null> => {
  try {
    const { userId, parkingLotId, rating, review } = data
    const feedbackExists = await feedbackRepository.findFeedback(parkingLotId, userId)
    if (!feedbackExists) {
      const feedback = await feedbackRepository.addFeedback(parkingLotId, userId, rating, review)
      return feedback
    }
    return null

  } catch (error) {
    throw error
  }

}
