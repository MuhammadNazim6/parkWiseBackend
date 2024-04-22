import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { Ijwt } from "../../interface/services/Ijwt";
import { ILoginResponse } from "../../interface/services/IResponses";
import ErrorResponse from "../../handler/errorResponse";

export const loginUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<ILoginResponse>=>{
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      [ "email", "password"]
    );

    if (!validation.success) {
      return{
        status: 401,
        success: false,
        message: `The username or password is incorrect`, 
      }
    }

    const user = await userRepository.findUser(email); // checking if the user exist or not
      if(!user){
        return{
          status: 401,
          success: false,
          message: `The username or password is incorrect`, 
        }
      }

    const matchedPassword = await bcrypt.compare(password, user.password)
    if(!matchedPassword){
      throw ErrorResponse.badRequest("Passwords do not match");
    }
    const token = jwt.createJWT(user._id as string, user.email, "user", user.name);
    return {
      status: 200,
      success: true,
      message: `Successfully Logged In Welcome ${user.name}`,
      token : token,
      data : user
    };


  } catch (error) {
    throw error
  }
} 