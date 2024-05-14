import ParkingProviderModel from "../../model/providerModel";


export const blockUnblockProvider = async (
  email: string,
  state: boolean,
  providerModel: typeof ParkingProviderModel
): Promise<boolean> => {
  try {
    const blockedUnblockedProvider = await providerModel.updateOne({ email }, { isBlocked: state })
    return blockedUnblockedProvider.modifiedCount > 0
    
  } catch (error) {
    throw error
  }
}