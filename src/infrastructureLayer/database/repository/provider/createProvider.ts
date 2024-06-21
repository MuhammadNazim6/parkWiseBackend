import { IParkingProvider } from "../../../../domainLayer/providers";
import ParkingProviderModel from "../../model/providerModel";


export const createProvider = async (
  newProvider: IParkingProvider,
  provModel: typeof ParkingProviderModel
) => {
  try {
    
    const provider = await provModel.create(newProvider);
    await provider.save()
  return provider; 
    
  } catch (error) {
    console.log(error);
    
    throw error
  }
}