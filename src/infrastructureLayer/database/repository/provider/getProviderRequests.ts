import ParkingProviderModel from "../../model/providerModel";

export const getProviderRequests = async(
  provModel: typeof ParkingProviderModel
):Promise<{}[]> =>{

  const requests = await provModel.find({approvalStatus:'pending'}).populate('addressId');
  return requests
}