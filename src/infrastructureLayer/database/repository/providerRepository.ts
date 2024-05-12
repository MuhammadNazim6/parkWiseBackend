import { IParkingProvider, IParkingProviderReady } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../../usecaseLayer/interface/repository/IProviderRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/IResponses";
import ParkingProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider } from "./provider/findProvider";
import { changePassword } from "./provider/changePassword";
import { updateProviderWithSlots } from "./provider/updateProviderWithSlots";

export class ProviderRepository implements IProviderRepository {
  constructor(private readonly providerModel: typeof ParkingProviderModel) { }

  // Create new user
  async createProvider(newProvider: IParkingProvider): Promise<StoreData> {
    return createProvider(newProvider, this.providerModel);
  }

  //  Check if a user exists using email
  async findProvider(email: string): Promise<IParkingProvider | null> {
    return findProvider(email, this.providerModel);
  }

  async changePassword(email: string, password: string): Promise<boolean> {
    return changePassword(email, password, this.providerModel)
  }

  async updateProviderWithSlots(
    addressId: string,
    email:string,
    parkingName: string,
    parkingCount: number,
    waterServicePrice: number,
    evChargeFacilityPrice: number,
    airPressureCheckPrice: number,
    oneHourParkingAmount: number,
    // location: { lng: number, lat: number },
    latitude:number,
    longitude:number,
    startEndTime: string): Promise<boolean> {
    return updateProviderWithSlots(
        addressId,
        email,
        parkingName,
        parkingCount,
        waterServicePrice,
        evChargeFacilityPrice,
        airPressureCheckPrice,
        oneHourParkingAmount,
        // location,
        latitude,
        longitude,
        startEndTime,
        this.providerModel)
  }

}