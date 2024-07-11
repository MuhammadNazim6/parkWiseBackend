const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const fetchServicesCountForProvider = async (
  bookingModel: typeof BookingModel,
  provId: string
): Promise<{}> => {
  try {

    const provObjId = new ObjectId(provId);
    const servicesCount = await bookingModel.aggregate([
      {
        "$match": { "parkingLotId": provObjId }
      },
      {
        "$group": {
          "_id": null,
          "airPressureCount": {
            "$sum": {
              "$cond": ["$servicesUsed.airPressure", 1, 0]
            }
          },
          "waterServiceCount": {
            "$sum": {
              "$cond": ["$servicesUsed.waterService", 1, 0]
            }
          },
          "evChargingCount": {
            "$sum": {
              "$cond": ["$servicesUsed.evCharging", 1, 0]
            }
          }
        }
      },
      {
        "$project": {
          "_id": 0,
          "services": [
            { "name": "Air pressure", "value": "$airPressureCount" },
            { "name": "Water service", "value": "$waterServiceCount" },
            { "name": "EV charging", "value": "$evChargingCount" }
          ]
        }
      } 
     
    ]);

    return servicesCount[0]
  } catch (error) {
    throw error 
  }
}
