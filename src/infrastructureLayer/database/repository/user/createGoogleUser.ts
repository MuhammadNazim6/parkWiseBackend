import { StoreData } from "../../../../usecaseLayer/interface/services/IResponses";
import { IUser } from "../../../../domainLayer/users";
import UserModel from "../../model/userModel";

export const createGoogleUser = async (
  newUser: IUser,
  userModels: typeof UserModel
): Promise<StoreData> => {
  try {    
    const user = await userModels.create(newUser);
    await user.save()
    const responseData: StoreData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile

    };
    return responseData;

  } catch (error) {
    throw error
  }
}