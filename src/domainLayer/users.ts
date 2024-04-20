import { ObjectId, Document } from "mongoose";

export interface IUsers extends Document{
  _id: ObjectId;
  username: string | null;
  password: string | null;
  email: string | null;
  mobile: number | null;
  profilePic: string | null;
  bookingHistory: {
    amount: number | null;
    date: Date | null;
    duration: string | null;
    parkingLotId: ObjectId | null;
    servicesTaken: string[] | null;
  }[];
  status: boolean;
  favParkingLots: ObjectId[] | null;
  wallet: {
    balance: number | null;
    history: {
      amount: number | null;
      transactionType: string | null;
    };
  };
  reports: {
    providerId: ObjectId | null;
    reason: string | null;
  }[];
}
