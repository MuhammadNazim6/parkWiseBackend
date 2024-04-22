import ErrorResponse from '../../handler/errorResponse';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { ILoginResponse } from '../../interface/services/IResponses';



export const loginProvider = async (
  requestValidator: IRequestValidator,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt, 
  email: string,
  password: string
): Promise<ILoginResponse>=>{
  try {
    const validation = requestValidator.validateRequiredFields(
      {email,password},
      ['email','password']
    );

    if(!validation.success){
      throw ErrorResponse.badRequest(validation.message as string)
    }

    const provider = await providerRepository.findProvider(email);
    if(!provider){
      return{
        status: 401,
        success: false,
        message: `The username or password is incorrect`, 
      }
    }
    const matchedPassword = await bcrypt.compare(password, provider.password)
    if(!matchedPassword){
      return{
        status: 401,
      success: false,
      message: `The username or password is incorrect`, 
      }
    }
    const token = jwt.createJWT(provider._id as string, provider.email, "providerJwt", provider.name);
    return {
      status: 200,
      success: true,
      message: `Successfully Logged In Welcome ${provider.name}`,
      token : token,
      data : provider
    };

  } catch (error) {
    throw error
  }
} 