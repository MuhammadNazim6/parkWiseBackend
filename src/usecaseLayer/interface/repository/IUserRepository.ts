import { IUser } from "../../../domainLayer/users";
import { StoreData } from "../services/IResponses";
// import { IBlockUnblockResponse } from "../services/IResponses";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<StoreData>;
  findUser(email: string): Promise<IUser | null>;
  loginUser(email: string, password: string): Promise<IUser | null>;
  createGoogleUser(newUser: IUser): Promise<StoreData>;
  changePassword(email: string, password: string): Promise<boolean>;
  getUsers(): Promise<{}[]>;
  blockUnblockUser(email:string,status:boolean): Promise<boolean>;

}  