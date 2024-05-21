import mongoose from "mongoose";
import ParkingProviderModel from "../../model/providerModel";

export const getLotDetails = async (
  lotId: string,
  provModel: typeof ParkingProviderModel
): Promise<{}[]> => {
  try {
    const lotObjectId = new mongoose.Types.ObjectId(lotId);
    const lotDetails = await provModel.aggregate([
      { $match: { _id: lotObjectId } },
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
    ])
    return lotDetails

  } catch (error) {
    console.log(error);
    throw error
  }
}   