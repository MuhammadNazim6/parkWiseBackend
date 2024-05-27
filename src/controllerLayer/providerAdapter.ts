import { IFile } from "../infrastructureLayer/middleware/multer";
import { uploadArrayOfImagesToS3, uploadToS3 } from "../infrastructureLayer/services/s3Bucket";
import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { ProviderUseCase } from "../usecaseLayer/usecase/providerUseCase";

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

      if (newProvider && newProvider.token) {
        res.cookie('refreshToken', newProvider.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        });
      }

      res.status(newProvider.status).json({
        success: newProvider.success,
        user: newProvider.data,
        token: newProvider.token,
        data: newProvider.data,

      });
    } catch (err) {
      next(err);
    }
  }

  // @desc Provider logout 
  // route POST api/provider/logout
  // @access Private
  async logoutProvider(req: Req, res: Res, next: Next) {
    try {

      res.cookie('refreshToken', '', {
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

  // @desc sending Lot For Approval
  // route POST api/user/sendLotForApproval
  // @access Private
  async sendLotForApproval(req: Req, res: Res, next: Next) {
    try {
      const files = req.files as IFile[];
      const uploadedImageNames = await uploadArrayOfImagesToS3(files)
      
      req.body.uploadedImageNames = uploadedImageNames

      const lotSent = await this.providerUseCase.sendLotForApproval(req.body);
      

  
      res.status(lotSent.status).json({
        success: lotSent.success,
        message: lotSent.message,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc getting provider details
  // route GET api/provider/getProviderDetails
  // @access Private
  async getProviderDetails(req: Req, res: Res, next: Next) {
    try {
      const { lotId } = req.params
      const details = await this.providerUseCase.fetchLotDetails(lotId);

      if (details) {
        res.status(200).json({
          success: true,
          data: details[0],
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'No results found'
        });
      }
    } catch (err) {
      next(err);
    }
  }



}