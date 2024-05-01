import { ObjectId } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  mobile: number;
  profilePic?: string | null;
  google?:boolean;
  bookingHistory?: {
    amount: number | null;
    date: Date | null;
    duration: string | null;
    parkingLotId: ObjectId | null;
    servicesTaken: string[] | null;
  }[];
  status?: boolean;
  favParkingLots?: ObjectId[] | null;
  wallet?: {
    balance: number | null;
    history: {
      amount: number | null;
      transactionType: string | null;
    };
  };
  reports?: {
    providerId: ObjectId | null;
    reason: string | null;
  }[];
  joinedAt?: Date | null
}
