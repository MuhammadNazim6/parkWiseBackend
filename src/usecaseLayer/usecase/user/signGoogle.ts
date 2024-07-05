import ErrorResponse from '../../handler/errorResponse';
import { IAdminRepsitory } from '../../interface/repository/IAdminRepository';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { ILoginResponse } from '../../interface/services/IResponses';
import { Ijwt } from "../../interface/services/Ijwt";

export const signGoogleUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  providerRepository: IProviderRepository,
  adminRepository: IAdminRepsitory,
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
    if (user?.google) {
      // user alreday present so logging in 
      const token = jwt.createJWT(user._id as string, user.email, "user", user.name);
      const refreshToken = jwt.createRefreshToken(user._id as string, user.email, "user", user.name);
      return {
        status: 200,
        success: true,
        token: token,
        refreshToken,
        data: {
          name: user.name,
          role: 'user',
          email: user.email,
          id: user._id as string,
          mobile: user.mobile
        }
      };
    } else {
      // checking if the email is taken by prov or admin
       // checking if prov exists with same email
    const prov = await providerRepository.findProvider(email);
    if (prov) {
      return {
        status: 200,
        success: false,
        message: `This email is already registered as a provider`,
      }
    }

    // checking if admin exists with same email
    const admin = await adminRepository.findAdmin(email);
    if (admin) {
      return {
        status: 200,
        success: false,
        message: `This email is not available for registration`,
      }
    }

    // checking if user exists with same email
    const user = await userRepository.findUser(email);
    if (user) {
      return {
        status: 200,
        success: false,
        message: `This email is already registered`,
      }
    }

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
      const refreshToken = jwt.createRefreshToken(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);

      return {
        status: 200,
        success: true,
        token: token,
        refreshToken,
        data: {
          name: createnewUser.name,
          role: 'user',
          email: createnewUser.email,
          id: createnewUser._id as string,
          mobile: createnewUser.mobile as number
        }
      };
    }
  } catch (error) {
    throw error
  }
} 