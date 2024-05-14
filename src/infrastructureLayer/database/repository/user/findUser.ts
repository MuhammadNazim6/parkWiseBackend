import UserModel from "../../model/userModel";

export const findUser = async (
  email:string,
  userModels: typeof UserModel
) => {
  try {
    const userExists = await userModels.findOne({email:email});
    console.log(userExists);

    return userExists
  } catch (error) {
    throw error
  }
}