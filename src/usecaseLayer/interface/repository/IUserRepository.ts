import { IUser } from "../../../domainLayer/users";
import { IForgotPassword, StoreData } from "../services/IResponses";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<StoreData>;
  findUser(email: string): Promise<IUser | null>;
  // forgotPassword(newPassword: IForgotPassword): Promise<StoreData>;
  loginUser(email:string, password:string): Promise<IUser | null>;
  createGoogleUser(newUser:IUser):Promise<StoreData>;
}  