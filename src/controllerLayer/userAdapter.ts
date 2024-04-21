import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";


export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase; // using dependency injection to call the userusecase
  }

  // @desc  Register new user
  //route     POST api/user/singup
  //@access   Public
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);
      newUser &&
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(newUser.status).json({
        success: newUser.success,
        message: newUser.message,
        user: newUser.data,
      });
    } catch (err) {
      next(err);
    }
  }

  // @desc  Login user
  //route     POST api/user/login
  //@access   Public
  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);

      user &&
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

      res.status(user.status).json({
        success: user.success,
        message: user.message,
        // user: user.data,
      });
    } catch (err) {
      next(err);
    }
  }
}