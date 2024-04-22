import ParkingProviderModel from "../../model/providerModel";

export const findProvider = async (
  email:string,
  providerModel: typeof ParkingProviderModel
) => {
  try {
    const providerExists = await providerModel.findOne({email:email});
    return providerExists
  } catch (error) {
    throw error
  }
}