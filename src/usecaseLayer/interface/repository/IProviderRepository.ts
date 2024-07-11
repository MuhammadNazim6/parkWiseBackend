import { IParkingProvider, IFetchParkingLot } from "../../../domainLayer/providers";
import { IProvUpdateProfile } from "../../../infrastructureLayer/types/providerTypes";
import { IUpdateParkingLot } from "./ICommonInterfaces";

export interface IProviderRepository {
  createProvider(newUser: IParkingProvider): Promise<IParkingProvider>;
  findProvider(email: string): Promise<IParkingProvider | null>;
  findProviderWithId(id: string): Promise<IParkingProvider | null>;
  changePassword(email: string, password: string): Promise<boolean>;
  updateProviderWithSlots(
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
    uploadedImageNames: string[]
  ): Promise<boolean>;
  getProviderRequests(page: string): Promise<{}>;
  getApprovedProviders(page: string): Promise<{}>;
  blockUnblockProvider(email: string, status: boolean): Promise<boolean>;
  manageRequest(id: string, action: string): Promise<boolean>;
  getParkingLotsForHome(searchQuery: IFetchParkingLot): Promise<{}>
  getLotDetails(lotId: string): Promise<{}[]>
  updateProfile(lotId: string, toUpdate: IProvUpdateProfile): Promise<{}>
  updateParkingLotDetails(email: string, data: IUpdateParkingLot, images: string[]): Promise<{}>
  getProvProfile(provId: string): Promise<IParkingProvider | null>
}