import ParkingProviderModel from "../../model/providerModel";

export const getProviderRequests = async(
  provModel: typeof ParkingProviderModel
):Promise<{}[]> =>{
  try{
    const requests = await provModel.find({approvalStatus:'pending'}).populate('addressId');
    return requests
  }catch(error){
    throw error
  }
}