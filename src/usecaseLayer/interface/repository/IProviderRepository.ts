import { IParkingProvider } from "../../../domainLayer/providers";
import { StoreData } from "../services/IResponses";

export interface IProviderRepository {
  createProvider(newUser: IParkingProvider): Promise<StoreData>;
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
    startEndTime: string
  ): Promise<boolean>;
  getProviderRequests(): Promise<{}[]>;
  getApprovedProviders(): Promise<{}[]>;
  blockUnblockProvider(email: string, status: boolean): Promise<boolean>;
  manageRequest(id: string,action:string): Promise<boolean>;


}