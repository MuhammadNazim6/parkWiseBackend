import { ObjectId } from "mongoose";

export interface IBooking {
  parkingLotId: ObjectId;
  userId: ObjectId;
  amount: number;
  createdAt: Date;
  fromTime: string;
  toTime: string;
  servicesUsed: string[];
  paymentMethod: string;

}

