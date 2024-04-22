import { IParkingProvider } from "../../../../domainLayer/providers";
import { StoreData } from "../../../../usecaseLayer/interface/services/IResponses";
import ParkingProviderModel from "../../model/providerModel";


export const createProvider = async (
  newProvider: IParkingProvider,
  provModel: typeof ParkingProviderModel
): Promise<StoreData> => {
  try {
    const provider = await provModel.create(newProvider);
    await provider.save()
    const responseData: StoreData = {
      _id: provider._id,
      name: provider.name,
      email : provider.email
    };
  return responseData; 
    
  } catch (error) {
    throw error
  }
}