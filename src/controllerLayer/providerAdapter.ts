import { token } from "morgan";
import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { ProviderUseCase } from "../usecaseLayer/usecase/providerUseCase";
import { ILoginResponse } from "../usecaseLayer/interface/services/IResponses";

export class ProviderAdapter {
  private readonly providerUseCase: ProviderUseCase;

  constructor(providerUseCase: ProviderUseCase) {
    this.providerUseCase = providerUseCase;  // using dependency injection to call the providerUseCase
  }

  // @desc  Register new provider
  //route     POST api/provider/register
  //@access   Public
  async createProvider(req: Req, res: Res, next: Next) {
    try {
      const newProvider = await this.providerUseCase.createProvider(req.body);
      newProvider &&
        res.cookie("providerJwt", newProvider.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(newProvider.status).json({
        success: newProvider.success,
        user: newProvider.data,
        token: newProvider.token,
        data:newProvider.data
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc Provider Login
  // route POST api/provider/login
  // @access Public
  async loginProvider(req: Req, res: Res, next: Next) {
    try {
      const provider = await this.providerUseCase.loginProvider(req.body);
      provider &&
        res.cookie("providerJwt", provider.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(provider.status).json({
        success: provider.success,
        user: provider.data,
        token: provider.token,
        data:provider.data
      });
    } catch (error) {
      throw error
    }
  }


  // @desc Provider logout 
  // route POST api/provider/logout
  // @access Private
  async logoutProvider(req: Req, res: Res, next: Next) {
    try {

      res.cookie('providerJwt', '', {
        httpOnly: false,
        expires: new Date(0)
      })

      res.status(200).json({
        success: true,
        message: 'Provider logged out',
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc Provider otp send 
  // route POST api/provider/sendOtp
  // @access Public
  async sendOtp(req: Req, res: Res, next: Next) {
    try {
      const otpSentResponse = await this.providerUseCase.sendOtpProvider(req.body);
      res.status(otpSentResponse.status).json({
        success: otpSentResponse.success,
        message: otpSentResponse.message
      });

    } catch (err) {
      next(err);
    }
  }


  // @desc checking provider otp
  // route POST api/user/check-otp
  // @access Public
  async checkOtp(req: Req, res: Res, next: Next) {
    try {
      const matched = await this.providerUseCase.checkOtpProvider(req.body);

      res.status(matched.status).json({
        success: matched.success,
        message: matched.message
      });

    } catch (err) {
      next(err);
    }
  }
}