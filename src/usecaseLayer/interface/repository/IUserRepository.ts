import { IUser } from "../../../domainLayer/users";
import { IForgotPassword, StoreData } from "../services/IResponses";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<StoreData>;
  findUser(email: string): Promise<IUser | null>;
  // forgotPassword(newPassword: IForgotPassword): Promise<StoreData>;
}  