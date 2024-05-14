import { IAdmin } from "../../domainLayer/admin";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IAdminRepsitory } from "../interface/repository/IAdminRepository";
import IHashpassword from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";


export class AdminUseCase {
  private readonly adminRepository: IAdminRepsitory;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requestValidator: IRequestValidator;

  constructor(
    adminRepository: IAdminRepsitory,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requestValidator: IRequestValidator
  ) {
    this.adminRepository = adminRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.requestValidator = requestValidator;
  }

}
