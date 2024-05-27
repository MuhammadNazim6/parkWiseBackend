import ParkingProviderModel from "../../model/providerModel";

export const updateProviderWithSlots = async (
  addressId: string,
  email: string,
  parkingName: string,
  parkingCount: number,
  waterServicePrice: number,
  evChargeFacilityPrice: number,
  airPressureCheckPrice: number,
  oneHourParkingAmount: number,
  latitude: number,
  longitude: number,
  startEndTime: string,
  uploadedImageNames:string[],
  provModel: typeof ParkingProviderModel
): Promise<boolean> => {
  try {
    const startTime = startEndTime === "HALF" ? "06:00" : "00:00";
    const endTime = startEndTime === "HALF" ? "20:00" : "00:00";
    const approvalStatus = 'pending';
    const date = new Date();
    const updatedProvider = await provModel.updateOne(
      { email: email },
      {
        $set: {
          waterServicePrice,
          airPressureCheckPrice,
          evChargeFacilityPrice,
          startTime,
          endTime,
          availableSpace: parkingCount,
          parkingName,
          pricePerHour: oneHourParkingAmount,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          addressId,
          approvalStatus,
          requestDate: date,
          images:uploadedImageNames
        },
      }
    );
    return updatedProvider.modifiedCount > 0;

  } catch (error) {
    throw error;
  }
};
