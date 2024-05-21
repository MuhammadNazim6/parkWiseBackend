import { IFetchParkingLot } from "../../../../domainLayer/providers";
import ParkingProviderModel from "../../model/providerModel";

export const getParkingLotsForHome = async (
  searchQuery: IFetchParkingLot,
  provModel: typeof ParkingProviderModel
): Promise<{}[]> => {
  const { price, hasAirPressureCheck, hasEvCharging, hasWaterService, coordinates, page = '1', limit = '10' } = searchQuery;
  const coordinatesObj = JSON.parse(coordinates)

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
    
    return parkingLotsPaginated

  } catch (error) {
    console.log(error);
    throw error
  }
}   