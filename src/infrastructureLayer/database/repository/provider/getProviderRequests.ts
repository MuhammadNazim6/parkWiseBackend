import ParkingProviderModel from "../../model/providerModel";

export const getProviderRequests = async (
  provModel: typeof ParkingProviderModel,
  page: string
): Promise<{}> => {
  try {
    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit;

    const totalCount = await provModel.countDocuments({ approvalStatus: 'pending' });
    const requests = await provModel.find({ approvalStatus: 'pending' })
      .populate('addressId')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);
    console.log(requests);
    
    // const requests = await provModel.find({approvalStatus:'pending'}).populate('addressId');
    const data = {
      requests,
      totalPages
    }
    return data

  } catch (error) {
    throw error
  }
}