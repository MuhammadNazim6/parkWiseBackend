import { IAdmin } from "../../domainLayer/admin";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IAdminRepsitory } from "../interface/repository/IAdminRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";

import { loginAdmin } from "./admin/loginAdmin";

export class AdminUseCase{
  private readonly adminRepository: IAdminRepsitory;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    adminRepository: IAdminRepsitory,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ){
    this.adminRepository = adminRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }

  // login admin
  async loginAdmin({
    email,
    password
  }:{email:string,password:string}){
    return loginAdmin(
      this.requestValidator,
      this.adminRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    )
  }
}