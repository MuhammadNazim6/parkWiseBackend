import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { ProviderUseCase } from "../usecaseLayer/usecase/providerUseCase";

export class ProviderAdapter{
  private readonly providerUseCase: ProviderUseCase;
  
  constructor(providerUseCase:ProviderUseCase){
    this.providerUseCase = providerUseCase;  // using dependency injection to call the providerUseCase
  } 

  // @desc  Register new provider
  //route     POST api/provider/register
  //@access   Public
  async createProvider(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.providerUseCase.createProvider(req.body);
      newUser &&
        res.cookie("providerJwt", newUser.token, {
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


  // @desc Provider Login
  // route POST api/provider/login
  // @access Public
async loginProvider(req:Req, res:Res, next:Next) {
  try {
    const provider = await this.providerUseCase.loginProvider(req.body);
    provider &&
    res.cookie("providerJwt", provider.token, {
      httpOnly: true,
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

  res.status(provider.status).json({
    success: provider.success,
    message: provider.message,
    // user: user.data,
  });
  } catch (error) {
    throw error
  }
}


  // @desc Provider logout 
  // route POST api/provider/logout
  // @access Private
  async logoutProvider(req: Req, res: Res, next: Next) {
    try {

      res.cookie('providerJwt','',{
        httpOnly: false,
        expires:new Date(0)
      })

  
      res.status(200).json({
        success: true,
        message: 'Provider logged out',
      });
    } catch (err) {
      next(err);
    }
  }
}