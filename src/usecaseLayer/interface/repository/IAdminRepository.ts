import { IAdmin } from "../../../domainLayer/admin";

export interface IAdminRepsitory{
  findAdmin(email:string):Promise<IAdmin|null>;
  loginAdmin(email:string,password:string):Promise<IAdmin|null>;
}