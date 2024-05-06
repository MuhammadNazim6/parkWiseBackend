import ParkingProviderModel from "../../model/providerModel"

export const changePassword = async (
  email:string,
  password:string,
  providerModel: typeof ParkingProviderModel
):Promise<boolean> => {
  try {
    const changedPassword = await providerModel.updateOne({email},{password:password})
    return changedPassword.modifiedCount > 0
  } catch (error) {
    throw error
  }
}