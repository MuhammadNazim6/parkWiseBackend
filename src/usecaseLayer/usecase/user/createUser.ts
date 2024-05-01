import ErrorResponse from '../../handler/errorResponse';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { IResponse } from '../../interface/services/IResponses';


export const createUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  mobile: number,  
  email: string,
  password: string
): Promise<IResponse>=>{
  try {
    const validation = requestValidator.validateRequiredFields(
      { name, mobile, email, password },
      [ "name", "mobile", "email", "password"]
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
      const createnewUser = await userRepository.createUser(newUser);
      const token = jwt.createJWT(createnewUser._id as string, createnewUser.email, "user", createnewUser.name);

      return {
        status: 200,
        success: true,
        message: `Successfully Registerd Welcome ${createnewUser.name}`,
        token : token,
        data : createnewUser
      };
    }else{
      return {
        status: 200,
        success: true,
        message: `User already exists`,
      };
    }
  
  } catch (err) {
    throw err;
  }
};