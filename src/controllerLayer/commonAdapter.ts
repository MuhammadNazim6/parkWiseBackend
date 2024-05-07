import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { CommonUseCase } from "../usecaseLayer/usecase/commonUseCase";

export class CommonAdapter {
  private readonly commonUsecase: CommonUseCase;
  constructor(commonUsecase: CommonUseCase){
    this.commonUsecase = commonUsecase;
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