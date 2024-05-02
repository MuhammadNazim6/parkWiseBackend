import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUseCase";


export class UserAdapter {
  private readonly userusecase: UserUseCase;

  constructor(userusecase: UserUseCase) {
    this.userusecase = userusecase;
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
      if (user) {
        res.cookie("userjwt", user.token, {
          httpOnly: true,
          secure:process.env.NODE_ENV === 'production',
          sameSite: "strict", // Prevent CSRF attacks
          maxAge: 30 * 24 * 60 * 60 * 1000
        });
      }

      res.status(user.status).json({
        success: user.success,
        message: user.message,
        user: user.data,
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
      res.cookie('userjwt', '', {
        httpOnly: false,
        expires: new Date(0),

      })
      const user = await this.userusecase.logoutUser();
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (error) {
      next(error)
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
        message: otpSentResponse.message
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
        message: matched.message
      });

    } catch (err) {
      next(err);
    }
  }


  // @desc For login in or signup of user with google Auth
  // route POST api/user/signGoogle
  // @access Public
  async signGoogle(req: Req, res: Res, next: Next) {
    try {
      const signed = await this.userusecase.signGoogleUser(req.body);

      res.status(signed.status).json({
        success: signed.success,
        message: signed.message
      });

    } catch (err) {
      next(err);
    }
  }



} 