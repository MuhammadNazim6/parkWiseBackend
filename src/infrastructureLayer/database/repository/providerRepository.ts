import { IParkingProvider } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../../usecaseLayer/interface/repository/IProviderRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/IResponses";
import ParkingProviderModel from "../model/providerModel";
import { createProvider } from "./provider/createProvider";
import { findProvider } from "./provider/findProvider";
import { changePassword } from "./provider/changePassword";


export class ProviderRepository implements IProviderRepository{
  constructor(private readonly providerModel : typeof ParkingProviderModel){}

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

}