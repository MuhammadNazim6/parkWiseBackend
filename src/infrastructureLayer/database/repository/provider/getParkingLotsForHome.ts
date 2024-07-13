import { IFetchParkingLot } from "../../../../domainLayer/providers";
import ParkingProviderModel from "../../model/providerModel";

export const getParkingLotsForHome = async (
  searchQuery: IFetchParkingLot,
  provModel: typeof ParkingProviderModel
): Promise<{}> => {
  const { price, hasAirPressureCheck, hasEvCharging, hasWaterService, coordinates, page = '1', limit = '10' } = searchQuery;
  const coordinatesObj = JSON.parse(coordinates)

  let query: {
    pricePerHour?: {};
    airPressureCheckPrice?: {};
    evChargeFacilityPrice?: {};
    waterServicePrice?: {};
    approvalStatus?:string;
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
  query.approvalStatus = 'true'
  

  try {
    const results = await provModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [coordinatesObj[0], coordinatesObj[1]] },
          distanceField: 'distance',
          maxDistance: 20000,
          spherical: true
        }
      },
      { $match: query },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          paginatedResults: [{
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
          ]
        }
      }
    ]);

    const totalCount = results[0].totalCount.length > 0 ? results[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const parkingLotsPaginated = results[0].paginatedResults;

    return { parkingLotsPaginated, totalPages, totalCount };

  } catch (error) {
    console.log(error);
    throw error
  }
}   