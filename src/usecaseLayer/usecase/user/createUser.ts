import ErrorResponse from '../../handler/errorResponse';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { ILoginResponse, IErrorResponse } from '../../interface/services/IResponses';


export const createUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  mobile: number,
  email: string,
  password: string
): Promise<ILoginResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { name, mobile, email, password },
      ["name", "mobile", "email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email); // checking if the user exist or not
    if (!user) {
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        name,
        mobile,
        email,
        password: hashedPassword,
      };
      const user = await userRepository.createUser(newUser);
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
      return {
        status: 200, //changed from 200 to 409 for checking 
        success: true,
        message: `User already exists`,
      };
      // throw ErrorResponse.badRequest("User already exists");
    }

  } catch (err) {
    throw err;
  }
};