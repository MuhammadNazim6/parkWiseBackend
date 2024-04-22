import { IParkingProvider } from "../../domainLayer/providers";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IProviderRepository } from "../interface/repository/IProviderRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";

import { createProvider } from "./provider/createProvider";
import { loginProvider } from "./provider/loginProvider";

export class ProviderUseCase{
  private readonly providerRepository: IProviderRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    providerRepository: IProviderRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ){
    this.providerRepository = providerRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }

  // provider register
  async createProvider({
    name,
    email,
    password,
    mobile
  }:{email:string,
    password:string,
    name:string,
    mobile:number
  }){
    return createProvider(
      this.requestValidator,
      this.providerRepository,
      this.bcrypt,
      this.jwt,
      name,
      mobile,
      email,
      password
    )
  }


   // provider login
   async loginProvider({
    email,
    password,
  }:{email:string,
    password:string,
  }){
    return loginProvider(
      this.requestValidator,
      this.providerRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    )
  }
}