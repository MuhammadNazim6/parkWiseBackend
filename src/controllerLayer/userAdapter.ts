import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";
import type { ProviderUseCase } from '../usecaseLayer/usecase/providerUseCase'
import { IFetchParkingLot } from "../domainLayer/providers";

export class UserAdapter {
  private readonly userusecase: UserUseCase;
  private readonly providerUsecase: ProviderUseCase

  constructor(userusecase: UserUseCase, providerUsecase: ProviderUseCase) {
    this.userusecase = userusecase;
    this.providerUsecase = providerUsecase
  }

  // @desc  Register new user
  //route     POST api/user/singup
  //@access   Public
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      if (newUser && newUser.token) {
        res.cookie('refreshToken', newUser.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(newUser.status).json({
        success: newUser.success,
        message: newUser.message,
        token: newUser.token,
        data: newUser.data,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc  Logout user
  //route     POST api/user/logout
  //@access   Private
  async logoutuser(req: Req, res: Res, next: Next) {
    try {
      res.cookie('refreshToken', "", {
        httpOnly: false,
        expires: new Date(0),
      });
      const user = await this.userusecase.logoutUser();
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (error) {
      next(error);
    }
  }

  // @desc User otp send
  // route POST api/user/sendOtp
  // @access Public
  async sendOtp(req: Req, res: Res, next: Next) {
    try {
      const otpSentResponse = await this.userusecase.sendOtpUser(req.body);

      res.status(otpSentResponse.status).json({
        success: otpSentResponse.success,
        message: otpSentResponse.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc checking user otp
  // route POST api/user/check-otp
  // @access Public
  async checkOtp(req: Req, res: Res, next: Next) {
    try {
      const matched = await this.userusecase.checkOtpUser(req.body);

      res.status(matched.status).json({
        success: matched.success,
        message: matched.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc For logging in or signuing up of user with google Authentication
  // route POST api/user/signGoogle
  // @access Public
  async signGoogle(req: Req, res: Res, next: Next) {
    try {
      const signed = await this.userusecase.signGoogleUser(req.body);

      if (signed && signed.token) {
        res.cookie('refreshToken', signed.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      res.status(signed.status).json({
        success: signed.success,
        message: signed.message,
        token: signed.token,
        data: signed.data,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc For logging in or signuing up of user with google Authentication
  // route POST api/user/signGoogle
  // @access Public
  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      const otpSentForForgotpass = await this.userusecase.sendForgotPassword(req.body)

      res.status(otpSentForForgotpass.status).json({
        success: otpSentForForgotpass.success,
        message: otpSentForForgotpass.message,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc Updating existing password with newpassword
  // @access Public
  async changePassword(req: Req, res: Res, next: Next) {
    try {
      const passwordChanged = await this.userusecase.changePassword(req.body)
      res.status(passwordChanged.status).json({
        success: passwordChanged.success,
        message: passwordChanged.message,
      });
    } catch (err) {
      next(err);
    }
  }

  async fetchParkingLotsInHome(req: Req, res: Res, next: Next) {
    try {
      const query: IFetchParkingLot = req.query as IFetchParkingLot;
      const parkingLots = await this.providerUsecase.fetchParkingLots(query);

      if (parkingLots) {
        console.log(parkingLots);

        res.status(200).json({
          data: parkingLots
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

  async fetchLotDetails(req: Req, res: Res, next: Next) {
    try {
      const { lotId } = req.params
      const details = await this.providerUsecase.fetchLotDetails(lotId);
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

  async getBookedSlots(req: Req, res: Res, next: Next) {
    try {
      const bookedSlots = await this.providerUsecase.getBookedSlots(req.body);

      if (bookedSlots) {
        res.status(200).json({
          success: true,
          data: bookedSlots
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

  async bookSlot(req: Req, res: Res, next: Next) {
    try {
      const slotBooked = await this.providerUsecase.bookSlot(req.body);
      if (slotBooked) {
        res.status(200).json({
          success: true,
          data: slotBooked
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to book'
        });
      }
    } catch (err) {
      next(err);
    }
  }


}
