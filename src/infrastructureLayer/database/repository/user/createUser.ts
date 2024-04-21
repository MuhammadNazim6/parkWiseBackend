import { IUser } from "../../../../domainLayer/users";
import { StoreData } from "../../../../usecaseLayer/interface/services/IResponses";
import UserModel from "../../model/userModel";



export const createUser = async (
  newUser: IUser,
  userModels: typeof UserModel
): Promise<StoreData> => {
  try {
    const user = await userModels.create(newUser);
    await user.save()
    const responseData: StoreData = {
      _id: user._id,
      name: user.name,
      email : user.email
    };
  return responseData; 
    
  } catch (error) {
    throw error
  }
}