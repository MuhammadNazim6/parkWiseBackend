import ErrorResponse from '../../handler/errorResponse';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { IResponse } from '../../interface/services/IResponses';

export const createProvider = async(
  requestValidator: IRequestValidator,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  mobile: number,  
  email: string,
  password: string
): Promise<IResponse>=>{
  try {
    const validation = requestValidator.validateRequiredFields(
      {name,mobile,email,password},
      ['name','mobile','email','password']
    );

    if(!validation.success){
      throw ErrorResponse.badRequest(validation.message as string)
    }

    const provider = await providerRepository.findProvider(email);
    if(!provider){
      const hashedPassword = await bcrypt.createHash(password);
      const newProvider = {
        name,
        mobile,
        email,
        password: hashedPassword,
      };
      const createnewProvider = await providerRepository.createProvider(newProvider);
      const token = jwt.createJWT(createnewProvider._id as string, createnewProvider.email, "provider", createnewProvider.name);

      return {
        status: 200,
        success: true,
        message: `Successfully Registerd Welcome ${createnewProvider.name}`,
        token : token,
        data : createnewProvider
      };
    }
    throw ErrorResponse.badRequest("Provider already exists");

  } catch (error) {
    throw error
  }
}