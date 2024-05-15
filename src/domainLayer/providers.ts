import { ObjectId, Document } from "mongoose";

export interface IParkingProvider {
  _id?: string;
  name: string;
  password: string;
  mobile: number | null;
  email: string;
  approvalStatus?: "pending" | 'true' | 'false' | 'rejected';
  isBlocked?:Boolean;
}

export interface IParkingProviderReady extends IParkingProvider {
  waterServicePrice:number;
  airPressureCheckPrice:number;
  evChargeFacilityPrice:number;
  startTime: string;
  availableSpace: number;
  feedbacks: ObjectId[];
  parkingName: string;
  pricePerHour: number;
  location: {
   lng:number,
   lat:number
  };
  notifications: {
    message: string;
    sentAt: Date;
  }[];
  endTime: string;
  addressId:ObjectId;
  requestDate:Date;
}