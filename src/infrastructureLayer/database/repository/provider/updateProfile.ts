import { IProvUpdateProfile } from "../../../types/providerTypes";
import ParkingProviderModel from "../../model/providerModel";
import mongoose from "mongoose";
export const updateProfile = async (
  lotId: string,
  { name, mobile, email }: IProvUpdateProfile,
  provModel: typeof ParkingProviderModel
): Promise<{}> => {
  try {

    const lotObjectId = new mongoose.Types.ObjectId(lotId);
    const updatedProvider = await provModel.findOneAndUpdate(
      { _id: lotObjectId },
      {
        $set: {
          name,
          email,
          mobile,
        },
      },
      { new: true }
    );

    if (updatedProvider) {
      return updatedProvider;
    }
    return false

  } catch (error) {
    console.log(error);

    throw error;
  }
};
