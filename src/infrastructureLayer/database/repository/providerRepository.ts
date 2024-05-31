import { IFetchParkingLot, IParkingProvider, IParkingProviderReady } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../../usecaseLayer/interface/repository/IProviderRepository";
import { IProviderLoginResponse, StoreData } from "../../../usecaseLayer/interface/services/IResponses";
import ParkingProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider, findProviderWithId } from "./provider/findProvider";
import { changePassword } from "./provider/changePassword";
import { updateProviderWithSlots } from "./provider/updateProviderWithSlots";
import { getProviderRequests } from "./provider/getProviderRequests";
import { getApprovedProviders } from "./provider/getApprovedProviders";
import { blockUnblockProvider } from "./provider/blockUnblockProvider";
import { manageRequest } from "./provider/manageRequest";
import { getParkingLotsForHome } from "./provider/getParkingLotsForHome";
import { getLotDetails } from "./provider/getLotDetails";
import { getBookedSlots } from "./booking/getBookedSlots";
import { IProvUpdateProfile } from "../../types/providerTypes";
import { updateProfile } from "./provider/updateProfile";

export class ProviderRepository implements IProviderRepository {
  constructor(private readonly providerModel: typeof ParkingProviderModel) { }

  // Create new user
  async createProvider(newProvider: IParkingProvider) {
    return createProvider(newProvider, this.providerModel);
  }

  //  Check if a user exists using email
  async findProvider(email: string): Promise<IParkingProvider | null> {
    return findProvider(email, this.providerModel);
  }

  async findProviderWithId(id: string): Promise<IParkingProvider | null> {
    return findProviderWithId(id, this.providerModel);
  }

  async changePassword(email: string, password: string): Promise<boolean> {
    return changePassword(email, password, this.providerModel)
  }

  async updateProviderWithSlots(
    addressId: string,
    email: string,
    parkingName: string,
    parkingCount: number,
    waterServicePrice: number,
    evChargeFacilityPrice: number,
    airPressureCheckPrice: number,
    oneHourParkingAmount: number,
    latitude: number,
    longitude: number,
    startEndTime: string,
    uploadedImageNames: string[]): Promise<boolean> {
    return updateProviderWithSlots(
      addressId,
      email,
      parkingName,
      parkingCount,
      waterServicePrice,
      evChargeFacilityPrice,
      airPressureCheckPrice,
      oneHourParkingAmount,
      latitude,
      longitude,
      startEndTime,
      uploadedImageNames,
      this.providerModel)
  }

  async getProviderRequests(): Promise<{}[]> {
    return getProviderRequests(
      this.providerModel
    )
  }

  async getApprovedProviders(): Promise<{}[]> {
    return getApprovedProviders(
      this.providerModel
    )
  }

  async blockUnblockProvider(email: string, state: boolean): Promise<boolean> {
    return blockUnblockProvider(
      email,
      state,
      this.providerModel
    )
  }

  async manageRequest(id: string, action: string): Promise<boolean> {
    return manageRequest(
      id,
      action,
      this.providerModel
    )
  }
  async getParkingLotsForHome(searchQuery: IFetchParkingLot): Promise<{}[]> {
    return getParkingLotsForHome(searchQuery, this.providerModel);
  }

  async getLotDetails(lotId: string): Promise<{}[]> {
    return getLotDetails(lotId, this.providerModel);
  }

  async updateProfile(lotId: string, toUpdate: IProvUpdateProfile): Promise<{}> {    
    return updateProfile(lotId, toUpdate, this.providerModel);
  }


}