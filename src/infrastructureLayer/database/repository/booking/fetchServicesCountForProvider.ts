const { ObjectId } = require('mongodb');
import BookingModel from "../../model/bookingModel";

export const fetchServicesCountForProvider = async (
  bookingModel: typeof BookingModel,
  provId: string
): Promise<{}> => {
  try {

    const provObjId = new ObjectId(provId);
console.log(provObjId);

    const servicesCount = await bookingModel.aggregate([
      {
        "$match": { "_id": provObjId }
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

    const initial = [
      { "name": "Air pressure", "value": 0 },
      { "name": "Water service", "value": 0 },
      { "name": "EV charging", "value": 0 }
    ]
console.log(servicesCount);

    return servicesCount
  } catch (error) {
    throw error 
  }
}
