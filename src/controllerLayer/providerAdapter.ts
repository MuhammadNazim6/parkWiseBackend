import { IFile } from "../infrastructureLayer/middleware/multer";
import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { ProviderUseCase } from "../usecaseLayer/usecase/providerUseCase";

export class ProviderAdapter {
  private readonly _providerUseCase: ProviderUseCase;

  constructor(providerUseCase: ProviderUseCase) {
    this._providerUseCase = providerUseCase;  // using dependency injection to call the providerUseCase
  }

  // @desc  Register new provider
  //route     POST api/provider/register
  //@access   Public
  async createProvider(req: Req, res: Res, next: Next) {
    try {
      const newProvider = await this._providerUseCase.createProvider(req.body);

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
      const otpSentResponse = await this._providerUseCase.sendOtpProvider(req.body);
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
      const matched = await this._providerUseCase.checkOtpProvider(req.body);

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
      const lotSent = await this._providerUseCase.sendLotForApproval(req.body, files);

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
      const details = await this._providerUseCase.fetchLotDetails(lotId);

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

  async updateProvProfile(req: Req, res: Res, next: Next) {
    try {
      const { lotId } = req.params
      const updated = await this._providerUseCase.updateProvProfile(lotId, req.body);

      if (updated) {
        res.status(200).json({
          success: true,
          data: updated
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to update'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchLotsBookings(req: Req, res: Res, next: Next) {
    try {
      const { lotId } = req.params
      const bookings = await this._providerUseCase.fetchLotsBookings(lotId);
      if (bookings) {
        res.status(200).json({
          success: true,
          data: bookings
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async checkProvPassword(req: Req, res: Res, next: Next) {
    try {
      const { provId, password } = req.body;
      const checked = await this._providerUseCase.checkProvPassword(provId, password);
      if (checked) {
        res.status(200).json({
          success: true,
          message: 'Password is correct'
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Incorrect password entered'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateParkingLotDetails(req: Req, res: Res, next: Next) {
    try {
      const files = req.files as IFile[];

      const updated = await this._providerUseCase.updateParkingLotDetails(req.body, files);
      if (updated) {
        res.status(200).json({
          success: true,
          message: 'The parking lot has been updated'
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Unable to update parking lot'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchServicesCount(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const count = await this._providerUseCase.fetchServicesCount(provId) as { services: { name: string; value: number }[] }

      if (count) {
        res.status(200).json({
          success: true,
          data: count.services
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch used services count'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchTodaysBookingCountProv(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const count = await this._providerUseCase.fetchTodaysBookingCountProv(provId)

      if (count) {
        res.status(200).json({
          success: true,
          data: count
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch todays booking count'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchMonthlyProv(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const monthly = await this._providerUseCase.fetchMonthlyProv(provId)

      if (monthly) {
        res.status(200).json({
          success: true,
          data: monthly
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch monthly bookings'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchWeeklyProv(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const weekly = await this._providerUseCase.fetchWeeklyProv(provId)

      if (weekly) {
        res.status(200).json({
          success: true,
          data: weekly
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch weekly bookings'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchDailyProv(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const daily = await this._providerUseCase.fetchDailyProv(provId)
      console.log('Count', daily);

      if (daily) {
        res.status(200).json({
          success: true,
          data: daily
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch daily bookings'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getProvProfile(req: Req, res: Res, next: Next) {
    try {
      const { provId } = req.params
      const profile = await this._providerUseCase.getProvProfile(provId);
      if (profile) {
        res.status(200).json({
          success: true,
          data: profile
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch provider profile'
        });
      }
    } catch (err) {
      next(err);
    }
  }


}