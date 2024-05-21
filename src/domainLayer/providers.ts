import { ObjectId, Document } from "mongoose";
import { ParsedQs } from 'qs';

export interface IParkingProvider {
  _id?: string
  name: string;
  password: string;
  mobile: number | null;
  email: string;
  approvalStatus?: "pending" | 'true' | 'false' | 'rejected';
  isBlocked?: Boolean;
}

export interface IParkingProviderReady extends IParkingProvider {
  waterServicePrice: number;
  airPressureCheckPrice: number;
  evChargeFacilityPrice: number;
  startTime: string;
  availableSpace: number;
  feedbacks: ObjectId[];
  parkingName: string;
  pricePerHour: number;
  location?: {
    type?: string,
    coordinates?: number[];
  };
  notifications: {
    message: string;
    sentAt: Date;
  }[];
  endTime: string;
  addressId: ObjectId;
  requestDate: Date;
}

export interface IFetchParkingLot extends ParsedQs {
  coordinates: string;
  price: string;
  hasAirPressureCheck: string;
  hasEvCharging: string;
  hasWaterService: string;
  page: string;
  limit: string;
}