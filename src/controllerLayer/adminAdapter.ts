import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";

export class AdminAdapter{
  private readonly adminUsecase : AdminUseCase;

  constructor(adminUsecase:AdminUseCase) {
    this.adminUsecase = adminUsecase;   // using dependency injection to call the adminUsecase
  }


  // @desc Admin logout 
  // route POST api/admin/logout
  // @access Private
  async logoutAdmin(req: Req, res: Res, next: Next) {
    try {

      res.cookie('adminjwt','',{
        httpOnly: false,
        expires:new Date(0)
      })

  
      res.status(200).json({
        success: true,
        message: 'Admin logged out',
      });
    } catch (err) {
      next(err);
    }
  }


}