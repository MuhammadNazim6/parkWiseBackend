import UserModel from "../../model/userModel";

export const updateUserProfile = async (
  id: string,
  email: string,
  name: string,
  mobile: number,
  uploadedImageName: string,
  userModels: typeof UserModel
): Promise<{}> => {
  try {
    const updatedUser = await userModels.updateOne({ _id: id },
      {
        $set: {
          email,
          name,
          mobile,
          profilePic: uploadedImageName
        },
      }
    );
    
    return updatedUser.modifiedCount > 0;

  } catch (error) {
    throw error
  }
}

export const updateUserProfileWithoutImage = async (
  id: string,
  email: string,
  name: string,
  mobile: number,
  userModels: typeof UserModel
): Promise<{}> => {
  try {
    const updatedUser = await userModels.updateOne({ _id: id },
      {
        $set: {
          email,
          name,
          mobile,
        },
      }
    );
    
    return updatedUser.modifiedCount > 0;

  } catch (error) {
    throw error
  }
}