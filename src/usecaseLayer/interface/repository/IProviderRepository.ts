import { IParkingProvider } from "../../../domainLayer/providers";
import { StoreData } from "../services/IResponses";

export interface IProviderRepository {
  createProvider(newUser: IParkingProvider): Promise<StoreData>;
  findProvider(email:string):Promise<IParkingProvider|null>;
  changePassword(email:string,password:string): Promise< boolean >;

}  