import { IUpdateParkingLot } from "../../../../usecaseLayer/interface/repository/ICommonInterfaces";
import ParkingProviderModel from "../../model/providerModel";


export const updateParkingLotDetails = async (
  email: string,
  data: IUpdateParkingLot,
  images: string[],
  provModel: typeof ParkingProviderModel
): Promise<{}> => {
  try {
    const updatedProvider = await provModel.updateOne(
      { email },
      {
        $set: {
          waterServicePrice: parseInt(data.waterServicePrice) ? parseInt(data.waterServicePrice) : null,
          evChargeFacilityPrice: parseInt(data.evChargeFacilityPrice) ? parseInt(data.evChargeFacilityPrice) : null,
          airPressureCheckPrice: parseInt(data.airPressureCheckPrice) ? parseInt(data.airPressureCheckPrice) : null,
          availableSpace: parseInt(data.availableSpace),
          pricePerHour: parseInt(data.pricePerHour),
          images
        },
      }
    );

    return updatedProvider.modifiedCount > 0;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
