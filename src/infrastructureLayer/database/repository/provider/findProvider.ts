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

export const findProviderWithId = async (
  id:string,
  providerModel: typeof ParkingProviderModel
) => {
  try {
    const providerExists = await providerModel.findById(id);
    return providerExists
  } catch (error) {
    throw error
  }
}