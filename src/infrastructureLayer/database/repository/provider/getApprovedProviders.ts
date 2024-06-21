import ParkingProviderModel from "../../model/providerModel";

export const getApprovedProviders = async(
  provModel: typeof ParkingProviderModel
):Promise<{}[]> =>{
  try{
    const requests = await provModel.find({approvalStatus:'true'}).populate('addressId');
    return requests
  }catch(error){
    throw error
  }
}   