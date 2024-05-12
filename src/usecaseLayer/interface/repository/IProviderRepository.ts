import { IParkingProvider } from "../../../domainLayer/providers";
import { StoreData } from "../services/IResponses";

export interface IProviderRepository {
  createProvider(newUser: IParkingProvider): Promise<StoreData>;
  findProvider(email: string): Promise<IParkingProvider | null>;
  changePassword(email: string, password: string): Promise<boolean>;
  updateProviderWithSlots(
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
    startEndTime: string
  ):Promise<boolean>;

}