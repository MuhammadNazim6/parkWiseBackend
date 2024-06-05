import ErrorResponse from '../../handler/errorResponse';
import { IProviderRepository } from '../../interface/repository/IProviderRepository';
import { IRequestValidator } from '../../interface/repository/IvalidateRepository';
import IHashpassword from '../../interface/services/IHashpassword';
import { Ijwt } from '../../interface/services/Ijwt';
import { ILoginResponse, IProviderLoginResponse } from '../../interface/services/IResponses';

export const createProvider = async (
  requestValidator: IRequestValidator,
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  name: string,
  mobile: number,
  email: string,
  password: string
): Promise<ILoginResponse | IProviderLoginResponse> => {
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
      const refreshToken = jwt.createRefreshToken(provider._id as string, provider.email, "provider", provider.name);

      return {
        status: 200,
        success: true,
        token: token,
        refreshToken,
        data: {
          name: provider.name,
          role: 'provider',
          email: provider.email,
          approvalStatus: provider.approvalStatus,
          id: provider._id as string,
          mobile: provider.mobile as number
        }
      };
    }
    // else{
    //   return {
    //     status: 409, //changed from 200 to 409 for checking 
    //     success: true,
    //     message: `Provider already exists`,
    //   };
    // }
    throw ErrorResponse.badRequest("Provider already exists");

  } catch (error) {
    throw error
  }
}