import ErrorResponse from '../../handler/errorResponse';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { ILoginResponse, IErrorResponse } from '../../interface/services/IResponses';

export const createProvider = async (
  requestValidator: IRequestValidator,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  mobile: number,
  email: string,
  password: string
): Promise<ILoginResponse | IErrorResponse> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { name, mobile, email, password },
      ['name', 'mobile', 'email', 'password']
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string)
    }

    const provider = await providerRepository.findProvider(email);
    if (!provider) {
      const hashedPassword = await bcrypt.createHash(password);
      const newProvider = {
        name,
        mobile,
        email,
        password: hashedPassword,
      };
      const provider = await providerRepository.createProvider(newProvider);
      const token = jwt.createJWT(provider._id as string, provider.email, "provider", provider.name);

      return {
        status: 200,
      success: true,
      token: token,
      data: {
        name:provider.name,
        role:'user',
        email:provider.email
      }
      };
    }
    throw ErrorResponse.badRequest("Provider already exists");

  } catch (error) {
    throw error
  }
}