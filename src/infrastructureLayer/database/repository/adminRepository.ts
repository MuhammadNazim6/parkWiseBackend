import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepsitory } from "../../../usecaseLayer/interface/repository/IAdminRepository";
import AdminModel from "../model/adminModel";
import {loginAdmin} from './admin/loginAdmin';

export class AdminRepository implements IAdminRepsitory{
  constructor (private readonly adminModel: typeof AdminModel){
  } 

  // logging in admin
  loginAdmin(email: string, password: string): Promise<IAdmin | null> {
      return loginAdmin(email, this.adminModel)
  }

  findAdmin(email: string): Promise<IAdmin | null> {
      return loginAdmin(email, this.adminModel)
  }
}