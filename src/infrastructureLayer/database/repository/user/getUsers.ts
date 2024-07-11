import UserModel from "../../model/userModel";

export const getUsers = async (
  userModels: typeof UserModel,
  page: string
) => {
  try {
    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit;

    const users = await userModels.find().skip(skip).limit(limit);
    const totalCount = await userModels.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const data = {
      users,
      totalPages
    }

    return data
  } catch (error) {
    throw error
  }
}