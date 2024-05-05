import { IUserRepository } from "../../interface/repository/IUserRepository";
import { ILogoutResponse } from "../../interface/services/IResponses";

export const logoutUser = async(
  userRepository: IUserRepository,  
): Promise <ILogoutResponse>=>{
  try {
    return {
      status: 200,
      success: true,
      message: `Logged out successfully`,
    };
 
  } catch (error) {
    throw error
  }
}