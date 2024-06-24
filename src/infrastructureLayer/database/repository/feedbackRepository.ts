import { IFeedback } from "../../../domainLayer/feedback";
import { IFeedbackRepository } from "../../../usecaseLayer/interface/repository/IFeedbackRepository";
import FeedbackModel from "../model/feedbackModel";
import { addFeedback } from "./feedback/addFeedback";
import { deleteFeedback } from "./feedback/deleteFeedback";
import { editFeedback } from "./feedback/editFeedback";
import { findFeedback } from "./feedback/findFeedback";
import { getParkingFeedbacks } from "./feedback/getParkingFeedbacks";

export class FeedbackRepository implements IFeedbackRepository {
  constructor(private readonly _feedbackModel: typeof FeedbackModel) {
  }

  async findFeedback(parkingLotID: string, userId: string): Promise<boolean> {
    return findFeedback(this._feedbackModel, parkingLotID, userId);
  }
  async addFeedback(parkingLotID: string, userId: string, rating: number, review: string): Promise<IFeedback> {
    return addFeedback(this._feedbackModel, parkingLotID, userId, rating, review);
  }
  async deleteFeedback(feedbackId: string, userId: string): Promise<boolean> {
    return deleteFeedback(this._feedbackModel, feedbackId, userId);
  }
  async editFeedback(userId: string, parkingLotId: string, rating: number, review: string): Promise<IFeedback | null> {
    return editFeedback(this._feedbackModel, userId, parkingLotId, rating, review);
  }
  async getParkingFeedbacks(parkingLotId: string): Promise<IFeedback[]> {
    return getParkingFeedbacks(this._feedbackModel, parkingLotId);
  }



}