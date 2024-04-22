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
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(admin.status).json({
        success: admin.success,
        message: admin.message,
      });
    } catch (err) {
      next(err);
    }
  }
}