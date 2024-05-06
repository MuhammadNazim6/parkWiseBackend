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
      if (newUser && newUser.token) {
        res.cookie("userjwt", newUser.token, {
          httpOnly: true,
          sameSite: "none", 
          maxAge: 30 * 24 * 60 * 60 * 1000, 
        });
      }

      res.status(newUser.status).json({
          success: newUser.success,
          message: newUser.message,
          token: newUser  .token,
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
          sameSite: "none",
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(user.status).json({
        success: user.success,
        message: user.message,
        token: user.token,
        data:user.data
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
      res.cookie("userjwt", "", {
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

      res.status(signed.status).json({
        success: signed.success,
        message: signed.message,
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
}
