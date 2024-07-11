import type { Req, Res, Next } from '../infrastructureLayer/types/expressTypes'
import type { AdminUseCase } from '../usecaseLayer/usecase/adminUseCase'
import type { ProviderUseCase } from '../usecaseLayer/usecase/providerUseCase'
import type { UserUseCase } from '../usecaseLayer/usecase/userUseCase'

export class AdminAdapter {
  private readonly _adminUsecase: AdminUseCase
  private readonly _providerUsecase: ProviderUseCase
  private readonly _userUseCase: UserUseCase

  constructor(adminUsecase: AdminUseCase, providerUsecase: ProviderUseCase, userUseCase: UserUseCase) {
    this._adminUsecase = adminUsecase // using dependency injection to call the adminUsecase
    this._providerUsecase = providerUsecase
    this._userUseCase = userUseCase
  }

  // @desc Admin logout
  // route POST api/admin/logout
  // @access Private
  async logoutAdmin(req: Req, res: Res, next: Next) {
    try {
      res.cookie('refreshToken', '', {
        httpOnly: false,
        expires: new Date(0)
      })

      res.status(200).json({
        success: true,
        message: 'Admin logged out'
      })
    } catch (err) {
      next(err)
    }
  }
  // @desc Admin fetch providers requests 
  // route POST api/admin/getProvidersRequests
  // @access Private
  async getProvidersRequests(req: Req, res: Res, next: Next) {
    try {
      const { page } = req.query
      const data = await this._providerUsecase.getRequests(page as string)
      if (data) {
        res.status(200).json({
          success: true,
          data
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'No provider requests found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getApprovedProviders(req: Req, res: Res, next: Next) {
    try {
      const { page } = req.query
      const data = await this._providerUsecase.getApprovedProviders(page as string);
      if (data) {
        res.status(200).json({
          success: true,
          data
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'No approved providers found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const { page } = req.query
      const data = await this._userUseCase.getUsers(page as string);
      if (data) {
        res.status(200).json({
          success: true,
          data
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'No provider requests found'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async blockUnblockUser(req: Req, res: Res, next: Next) {
    try {
      const blockedUnblockedResponse = await this._userUseCase.blockUnblockUser(req.body);
      if (blockedUnblockedResponse.success) {
        res.status(200).json({
          success: blockedUnblockedResponse.success,
          message: blockedUnblockedResponse.message
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to block/unblock'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async blockUnblockProvider(req: Req, res: Res, next: Next) {
    try {
      const blockedUnblockedResponse = await this._providerUsecase.blockUnblockProvider(req.body);
      if (blockedUnblockedResponse.success) {
        res.status(200).json({
          success: blockedUnblockedResponse.success,
          message: blockedUnblockedResponse.message
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to block/unblock'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async acceptRequest(req: Req, res: Res, next: Next) {
    try {
      const accepted = await this._providerUsecase.acceptRequest(req.body);
      if (accepted.success) {
        res.status(200).json({
          success: accepted.success,
          message: accepted.message

        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to accept the provider request'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async rejectRequest(req: Req, res: Res, next: Next) {
    try {
      const accepted = await this._providerUsecase.rejectRequest(req.body);
      if (accepted.success) {
        res.status(200).json({
          success: accepted.success,
          message: accepted.message

        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to reject the provider request'
        });
      }
    } catch (err) {
      next(err);
    }
  }
  async fetchServicesCount(req: Req, res: Res, next: Next) {
    try {
      const count = await this._adminUsecase.fetchServicesCount();
      if (count) {
        res.status(200).json({
          success: true,
          data: count

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

  async fetchTotalBookingsToday(req: Req, res: Res, next: Next) {
    try {
      const count = await this._adminUsecase.fetchTotalBookingsToday();
      if (count) {
        res.status(200).json({
          success: true,
          data: count

        })
      } else {
        res.status(200).json({
          success: false,
          data: count
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchMonthly(req: Req, res: Res, next: Next) {
    try {
      const monthly = await this._adminUsecase.fetchMonthly();
      if (monthly) {
        res.status(200).json({
          success: true,
          data: monthly

        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch monthly data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchWeekly(req: Req, res: Res, next: Next) {
    try {
      const weekly = await this._adminUsecase.fetchWeekly();
      if (weekly) {
        res.status(200).json({
          success: true,
          data: weekly

        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch weekly data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async fetchDaily(req: Req, res: Res, next: Next) {
    try {
      const daily = await this._adminUsecase.fetchDaily();
      if (daily) {
        res.status(200).json({
          success: true,
          data: daily
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch daily data'
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getSuggestions(req: Req, res: Res, next: Next) {
    try {
      const { page } = req.query
      const data = await this._adminUsecase.getSuggestions(page as string);
      if (data) {
        res.status(200).json({
          success: true,
          data
        })
      } else {
        res.status(404).json({
          success: false,
          message: 'Unable to fetch suggestions'
        });
      }
    } catch (err) {
      next(err);
    }
  }


}