import ParkingProviderModel from "../../model/providerModel";


export const manageRequest = async (
  id: string,
  action: string,
  providerModel: typeof ParkingProviderModel
): Promise<boolean> => {
  try {
    const requestManaged = await providerModel.updateOne({ _id:id }, { approvalStatus: action })
    return requestManaged.modifiedCount > 0
    
  } catch (error) {
    throw error
  }
}