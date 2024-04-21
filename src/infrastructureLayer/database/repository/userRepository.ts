import { IUser } from "../../../domainLayer/users";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import { IForgotPassword, StoreData } from "../../../usecaseLayer/interface/services/IResponses";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import {findUser} from "./user/findUser"
import {loginUser} from "./user/loginUser"


export class UserRepository implements IUserRepository{
  constructor(private readonly usersModel : typeof UserModel){}

    // Create new user
    async createUser(newUser: IUser): Promise<StoreData> {
      return createUser(newUser, this.usersModel);
    }

      //  Check if a user exists using email
   async findUser(email: string): Promise<IUser | null> {
    return findUser(email, this.usersModel);
  }

    // forgot password
    // async forgotPassword(newPassword: IForgotPassword): Promise<StoreData> {
    //   return forgotPassword(newPassword, this.usersModel);
    // }
  
    // logging in user
    async loginUser(email: string, password: string): Promise<IUser | null> {
        return loginUser(email,this.usersModel)
    }

}