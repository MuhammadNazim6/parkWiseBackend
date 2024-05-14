import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";
import { ProviderUseCase } from "../usecaseLayer/usecase/providerUseCase";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";

export class AdminAdapter {
  private readonly adminUsecase: AdminUseCase;
  private readonly providerUsecase: ProviderUseCase;
  private readonly userUseCase: UserUseCase;

  constructor(adminUsecase: AdminUseCase, providerUsecase: ProviderUseCase, userUseCase: UserUseCase) {
    this.adminUsecase = adminUsecase; // using dependency injection to call the adminUsecase
    this.providerUsecase = providerUsecase;
    this.userUseCase = userUseCase;
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
        message: 'Admin logged out',
      });
    } catch (err) {
      next(err);
    }
  }
  // @desc Admin fetch providers requests 
  // route POST api/admin/getProvidersRequests
  // @access Private
  async getProvidersRequests(req: Req, res: Res, next: Next) {
    try {
      const requests = await this.providerUsecase.getRequests();
      if (requests) {
        res.status(200).json({
          data: requests
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
      const providers = await this.providerUsecase.getApprovedProviders();
      if (providers) {
        res.status(200).json({
          data: providers
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
      const requests = await this.userUseCase.getUsers();
      if (requests) {
        res.status(200).json({
          data: requests
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
      const blockedUnblockedResponse = await this.userUseCase.blockUnblockUser(req.body);
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
      const blockedUnblockedResponse = await this.providerUsecase.blockUnblockProvider(req.body);
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


}