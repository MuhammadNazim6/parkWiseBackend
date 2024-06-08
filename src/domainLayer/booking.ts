import { ObjectId } from "mongoose";

export interface IBooking {
  parkingLotId: ObjectId;
  userId: ObjectId;
  amount: number;
  createdAt: Date;
  bookingDate: Date;
  selectedSlots: string[]
  servicesUsed: { [service: string]: boolean };
  bookingStatus: string;
}

