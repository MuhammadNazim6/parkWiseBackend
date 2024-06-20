import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";
import type { ProviderUseCase } from '../usecaseLayer/usecase/providerUseCase'
import { IFetchParkingLot } from "../domainLayer/providers";
import { IFile } from "../infrastructureLayer/middleware/multer";

export class UserAdapter {
  private readonly _userusecase: UserUseCase;
  private readonly _providerUsecase: ProviderUseCase

  constructor(userusecase: UserUseCase, providerUsecase: ProviderUseCase) {
    this._userusecase = userusecase;
    this._providerUsecase = providerUsecase
  }

  // @desc  Register new user
  //route     POST api/user/singup
  //@access   Public
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this._userusecase.createUser(req.body);
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
      const user = await this._userusecase.logoutUser();
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
      const otpSentResponse = await this._userusecase.sendOtpUser(req.body);

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
      const matched = await this._userusecase.checkOtpUser(req.body);

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
      const signed = await this._userusecase.signGoogleUser(req.body);

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
      const otpSentForForgotpass = await this._userusecase.sendForgotPassword(req.body)

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
      const passwordChanged = await this._userusecase.changePassword(req.body)
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
      const parkingLots = await this._providerUsecase.fetchParkingLots(query);

      if (parkingLots) {
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
      const details = await this._providerUsecase.fetchLotDetails(lotId);
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
      const bookedSlots = await this._providerUsecase.getBookedSlots(req.body);

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
      const slotBooked = await this._providerUsecase.bookSlot(req.body);
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

  async updateUserProfile(req: Req, res: Res, next: Next) {
    try {
      const files = req.files as IFile[];
      const updatedProfile = await this._userusecase.updateUserProfile(req.body, files)
      if (updatedProfile) {
        res.status(200).json({
          success: true,
          message: 'User profile updated successfully'
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to update profile'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getUserProfilePic(req: Req, res: Res, next: Next) {
    try {
      const { id } = req.params
      const profilePic = await this._userusecase.getUserProfilePic(id)
      if (profilePic) {
        res.status(200).json({
          success: true,
          data: profilePic
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'No profile pic for the user'
        });
      }
    } catch (err) {
      next(err);
    }
  }


  async checkUserPassword(req: Req, res: Res, next: Next) {
    try {
      const { userId, password } = req.body;
      const checked = await this._userusecase.checkUserPassword(userId, password);
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

  async fetchUserBookings(req: Req, res: Res, next: Next) {
    try {
      const { userId, page } = req.query
      const bookings = await this._userusecase.fetchUserBookings(userId as string, page as string);

      if (bookings) {
        res.status(200).json({
          success: true,
          data: bookings
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to fetch data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async cancelBooking(req: Req, res: Res, next: Next) {
    try {
      const { bookingId } = req.params
      const cancelled = await this._userusecase.cancelBooking(bookingId);

      if (cancelled) {
        res.status(200).json({
          success: true,
          data: cancelled
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to cancel booking'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async confirmSlot(req: Req, res: Res, next: Next) {
    try {
      const alreadyFilledSlots = await this._userusecase.confirmSlot(req.body);
      if (alreadyFilledSlots) {
        res.status(200).json({
          success: true,
          data: alreadyFilledSlots
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to fetch data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getFilledSlots(req: Req, res: Res, next: Next) {
    try {
      const { bookingId } = req.params
      const alreadyFilledSlots = await this._userusecase.getFilledSlots(bookingId);
      if (alreadyFilledSlots) {
        res.status(200).json({
          success: true,
          data: alreadyFilledSlots
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to fetch data'
        });
      }
    } catch (err) {
      next(err);
    }
  }
  async rescheduleSlots(req: Req, res: Res, next: Next) {
    try {
      const { bookingId, slots } = req.body
      const rescheduled = await this._userusecase.rescheduleSlots(bookingId, slots);
      if (rescheduled) {
        res.status(200).json({
          success: true,
          message: 'Booking have been rescheduled'
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to reschedule booking'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getUserDetails(req: Req, res: Res, next: Next) {
    try {
      const { userId } = req.params
      const userDetails = await this._userusecase.getUserDetails(userId);
      if (userDetails) {
        res.status(200).json({
          success: true,
          data: userDetails
        })
      } else {
        res.status(200).json({
          success: false,
          message: 'Unable to get user details'
        });
      }
    } catch (err) {
      next(err);
    }
  }


}
