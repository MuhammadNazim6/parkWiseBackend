import { ObjectId } from "mongoose";

export interface IFeedback {
  parkingLotId: ObjectId;
  userId: ObjectId;
  rating: number;
  review: string;
}
