import { IFeedback } from '../../../domainLayer/feedback';

export interface IFeedbackRepository {
  findFeedback(userId: string, parkingLotId: string): Promise<boolean>
  addFeedback(parkingLotId: string, userId: string, rating: number, review: string): Promise<IFeedback>
  deleteFeedback(feedbackId: string, userId: string): Promise<boolean>
  editFeedback(userId: string, parkingLotId: string, rating: number, review: string): Promise<IFeedback | null>
  getParkingFeedbacks(parkingLotId: string): Promise<IFeedback[]>
}
