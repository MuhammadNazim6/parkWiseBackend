import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { CommonUseCase } from "../usecaseLayer/usecase/commonUseCase";

export class CommonAdapter {
  private readonly commonUsecase: CommonUseCase;
  constructor(commonUsecase: CommonUseCase){
    this.commonUsecase = commonUsecase;
  }

  // @desc Common login function for user, provider and admin
  // @access Public
  async commonLogin(req: Req, res: Res, next: Next) {
    try {
      const loggedInAccount = await this.commonUsecase.commonLogin(req.body);
      if (loggedInAccount) {
        const jwtKey = `${loggedInAccount.data?.role.toLowerCase()}jwt`;
  
        res.cookie(jwtKey, loggedInAccount.token, {
          httpOnly: true,
          sameSite: "strict", 
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
  
        res.status(loggedInAccount.status).json({
          success: loggedInAccount.success,
          message: loggedInAccount.message,
          token: loggedInAccount.token,
          data: loggedInAccount.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  


  // @desc Resending otp to user and provider
  // @access Public
  async resendOtp(req: Req, res: Res, next: Next) {
    try {
      const resentOtp = await this.commonUsecase.resendOtp(req.body)
      
      res.status(resentOtp.status).json({
        success: resentOtp.success,
        message: resentOtp.message,
      });
    } catch (err) {
      next(err);
    }
  }

}