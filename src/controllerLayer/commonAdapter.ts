import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { CommonUseCase } from "../usecaseLayer/usecase/commonUseCase";

export class CommonAdapter {
  private readonly _commonUsecase: CommonUseCase;
  constructor(commonUsecase: CommonUseCase) {
    this._commonUsecase = commonUsecase;
  }

  // @desc Common login function for user, provider and admin
  // @access Public
  async commonLogin(req: Req, res: Res, next: Next) {
    try {
      const loggedInAccount = await this._commonUsecase.commonLogin(req.body);
      if (loggedInAccount) {
        const jwtKey = 'refreshToken'

        res.cookie(jwtKey, loggedInAccount.refreshToken, {
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
      const resentOtp = await this._commonUsecase.resendOtp(req.body)

      res.status(resentOtp.status).json({
        success: resentOtp.success,
        message: resentOtp.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc For refreshing expired token 
  // @access Private
  async refreshToken(req: Req, res: Res, next: Next) {
    try {
      const refreshToken = await this._commonUsecase.updateToken(req.cookies.refreshToken)

      res.status(refreshToken.status).json({
        success: refreshToken.success,
        message: refreshToken.message,
        accessToken: refreshToken.accessToken
      });

    } catch (err) {
      next(err);
    }
  }

  async getBookingDetails(req: Req, res: Res, next: Next) {
    try {
      const { bookingId } = req.params
      const bookingDetail = await this._commonUsecase.getBookingDetails(bookingId);
      if (bookingDetail) {
        res.status(200).json({
          success: true,
          data: bookingDetail
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch details'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getConnections(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const conversations = await this._commonUsecase.getConnections(id);
      if (conversations) {
        res.status(200).json({
          success: true,
          data: conversations
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch connections'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getMessages(req: Req, res: Res, next: Next) {
    try {
      const { senderId, receiverId } = req.query;
      const messages = await this._commonUsecase.getMessages(senderId as string, receiverId as string);
      if (messages) {
        res.status(200).json({
          success: true,
          data: messages
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch connections'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async saveMessage(req: Req, res: Res, next: Next) {
    try {
      const saved = await this._commonUsecase.saveMessage(req.body);
      if (saved) {
        res.status(200).json({
          success: true,
          message: 'messages saved'
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch connections'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getSenderName(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const sender = await this._commonUsecase.getSenderName(id);
      if (sender) {
        res.status(200).json({
          success: true,
          data: sender
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch sender name'
        });
      }
    } catch (err) {
      next(err);
    }
  }


}