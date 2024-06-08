import { Ijwt } from "../../interface/services/Ijwt";
import { IRefreshTokenResponse } from "../../interface/services/IResponses";

export const updateToken = async (
  refreshToken: string,
  jwt: Ijwt
): Promise<IRefreshTokenResponse> => {

  if (!refreshToken) {
    return {
      status: 401,
      success: false,
      message: 'Refresh token not present'
    }
  }
  try {
    const decoded = jwt.decodeJWT(refreshToken);    
    const accessToken = jwt.createJWT(decoded.id, decoded.email, decoded.role, decoded.name);

    return {
      status: 200,
      success: true,
      message: 'Created access token successfully',
      accessToken: accessToken
    }

  } catch (error) {
    return {
      status: 403,
      success: false,
      message: 'Invalid hhjhjjh re,ngvkgcvkngvmnbvfresh token'
    }
  }
}