import { log } from "console";
import { IFetchParkingLot } from "../../../../domainLayer/providers";
import ParkingProviderModel from "../../model/providerModel";

export const getParkingLotsForHome = async (
  searchQuery: IFetchParkingLot,
  provModel: typeof ParkingProviderModel
): Promise<{}[]> => {
  const { price, hasAirPressureCheck, hasEvCharging, hasWaterService, coordinates, page = '1', limit = '10' } = searchQuery;
  console.log('In get parking file');

  console.log(price);
  console.log(hasEvCharging);
  console.log(coordinates);
  console.log(hasWaterService);
  console.log(hasAirPressureCheck);
  console.log(page);
  console.log(limit);
  const coordinatesObj = JSON.parse(coordinates)
  console.log(coordinatesObj);

  let query: {
    pricePerHour?: {};
    airPressureCheckPrice?: {};
    evChargeFacilityPrice?: {};
    waterServicePrice?: {};
  } = {}

  if (price) {
    query.pricePerHour = { $lte: parseInt(price) };
  }
  if (hasAirPressureCheck === 'true') {
    query.airPressureCheckPrice = { $gte: 1 }
  }
  if (hasEvCharging === 'true') {
    query.evChargeFacilityPrice = { $gte: 1 }
  }
  if (hasWaterService === 'true') {
    query.waterServicePrice = { $gte: 1 }
  }

  try {
    const parkingLotsPaginated = await provModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [coordinatesObj[0], coordinatesObj[1]] },
          distanceField: 'distance',
          maxDistance: 10000,
          spherical: true
        }
      },
      { $match: query },
      {
        $lookup: {
          from: 'addresses',
          localField: 'addressId',
          foreignField: '_id',
          as: 'address'
        }
      },
      {
        $unwind: '$address'
      },
      {
        $skip: (parseInt(page) - 1) * parseInt(limit)
      },
      {
        $limit: parseInt(limit)
      }
    ])

    console.log(parkingLotsPaginated);

    return parkingLotsPaginated

  } catch (error) {
    console.log(error);
    throw error
  }
}   