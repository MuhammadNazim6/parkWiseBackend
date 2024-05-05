import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";

export class AdminAdapter{
  private readonly adminUsecase : AdminUseCase;

  constructor(adminUsecase:AdminUseCase) {
    this.adminUsecase = adminUsecase;   // using dependency injection to call the adminUsecase
  }


  // @desc Admin login 
  // route POST api/admin/login
  // @access Public
  async loginAdmin(req: Req, res: Res, next: Next) {
    try {
      const admin = await this.adminUsecase.loginAdmin(req.body);

      admin &&
        res.cookie("adminjwt", admin.token, {
          httpOnly: true,
          sameSite: "strict", 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

      res.status(admin.status).json({
        success: admin.success,
        message: admin.message,
      });
    } catch (err) {
      next(err);
    }
  }


  // @desc Admin logout 
  // route POST api/admin/logout
  // @access Private
  async logoutAdmin(req: Req, res: Res, next: Next) {
    try {

      res.cookie('userjwt','',{
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