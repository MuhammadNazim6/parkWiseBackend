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
  // location: {
  //   lng: number;
  //   lat: number;
  // },
  latitude:number,
  longitude:number,
  startEndTime: string,
  provModel: typeof ParkingProviderModel
):Promise<boolean>   => {
  try {
    const startTime = startEndTime === "HALF" ? "06:00" : "00:00";
    const endTime = startEndTime === "HALF" ? "20:00" : "00:00";
    console.log(typeof location);
    
    
    const updatedProvider = await ParkingProviderModel.updateOne(
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
          location:{
            lat: latitude,
            lng: longitude
          },
          addressId,
        },
      }
    );
    return updatedProvider.modifiedCount > 0;

  } catch (error) {
    throw error;
  }
};
