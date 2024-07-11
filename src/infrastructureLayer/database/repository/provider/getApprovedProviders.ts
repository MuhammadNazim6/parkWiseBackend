import ParkingProviderModel from "../../model/providerModel";

export const getApprovedProviders = async (
  provModel: typeof ParkingProviderModel,
  page: string
): Promise<{}> => {
  try {
    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit;

    const totalCount = await provModel.countDocuments({ approvalStatus: 'true' });
    const providers = await provModel.find({ approvalStatus: 'true' })
      .populate('addressId')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    const data = {
      providers,
      totalPages
    }
    return data
  } catch (error) {
    throw error
  }
}   