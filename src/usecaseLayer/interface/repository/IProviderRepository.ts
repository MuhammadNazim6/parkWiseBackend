import { IParkingProvider, IFetchParkingLot } from "../../../domainLayer/providers";
import { IProvUpdateProfile } from "../../../infrastructureLayer/types/providerTypes";
import { StoreData } from "../services/IResponses";

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
  getProviderRequests(): Promise<{}[]>;
  getApprovedProviders(): Promise<{}[]>;
  blockUnblockProvider(email: string, status: boolean): Promise<boolean>;
  manageRequest(id: string, action: string): Promise<boolean>;
  getParkingLotsForHome(searchQuery: IFetchParkingLot): Promise<{}[]>
  getLotDetails(lotId: string): Promise<{}[]>
  updateProfile(lotId: string, toUpdate: IProvUpdateProfile): Promise<{}>

}