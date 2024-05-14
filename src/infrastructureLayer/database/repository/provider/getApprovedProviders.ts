import ParkingProviderModel from "../../model/providerModel";

export const getApprovedProviders = async(
  provModel: typeof ParkingProviderModel
):Promise<{}[]> =>{

  const requests = await provModel.find({approvalStatus:'true'})
  return requests
}   