import ErrorResponse from '../../handler/errorResponse';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { ILoginResponse } from '../../interface/services/IResponses';
import { Ijwt } from "../../interface/services/Ijwt";

export const signGoogleUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  email: string,
  mobile: number,
  password: string,
  google: boolean
): Promise<ILoginResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { email, name },
      ['email', 'name']
    );
    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string)
    }
    const user = await userRepository.findUser(email);
    if (user) {
      // user alreday present so logging in 
      const token = jwt.createJWT(user._id as string, user.email, "user", user.name);
      return {
        status: 200,
        success: true,
        token: token,
        data: {
          name: user.name,
          role: 'user',
          email: user.email
        }
      };
    } else {
      // registering as a user
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        name,
        mobile,
        email,
        password: hashedPassword,
        google
      };
      const createnewUser = await userRepository.createGoogleUser(newUser);
      const token = jwt.createJWT(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);
      return {
        status: 200,
        success: true,
        token: token,
        data: {
          name: createnewUser.name,
          role: 'user',
          email: createnewUser.email
        }
      };
    }
  } catch (error) {
    throw error
  }
} 