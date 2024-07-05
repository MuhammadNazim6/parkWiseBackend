import BookingModel from "../../model/bookingModel";

export const fetchServicesCountForAdmin = async (
  bookingModel: typeof BookingModel,
): Promise<{}> => {
  try {

    const servicesCount = await bookingModel.aggregate([
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

    
    return servicesCount[0].services
  } catch(error) {
    throw error
  }
}
