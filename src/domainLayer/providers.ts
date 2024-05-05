import { ObjectId, Document } from "mongoose";

export interface IParkingProvider {
  _id?: string;
  // profile?: string | null;
  services?: string[] | null;
  startTime?: Date | null;
  name: string;
  password: string;
  mobile: number | null;
  availableSpace?: string | null;
  feedbacks?: ObjectId[] | null;
  email: string;
  images?: string[] | null;
  // description?: string | null;
  parkingName?: string | null;
  pricePerHour?: string | null;
  // nearbyAttractions?: string | null;
  location?: {
    coordinates: number[] | null;
    type: string | null;
  };
  parkingRules?: string | null;
  isApproved?: boolean | null;
  notifications?: {
    message: string | null;
    sentAt: Date | null;
  }[];
  endTime?: Date | null;
}