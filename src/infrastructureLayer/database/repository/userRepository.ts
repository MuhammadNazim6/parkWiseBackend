import { IUser } from "../../../domainLayer/users";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IUserRepository";
import { StoreData } from "../../../usecaseLayer/interface/services/IResponses";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser"
import { loginUser } from "./user/loginUser"
import { createGoogleUser } from "./user/createGoogleUser";
import { changePassword } from "./user/changePassword";
import { getUsers } from "./user/getUsers";
import { blockUnblockUser } from "./user/blockUnblockUser";
import { updateUserProfile, updateUserProfileWithoutImage } from "./user/updateUserProfile";
import { findUserById } from "./user/findUserById";


export class UserRepository implements IUserRepository {
  constructor(private readonly usersModel: typeof UserModel) { }

  // Create new user
  async createUser(newUser: IUser): Promise<StoreData> {
    return createUser(newUser, this.usersModel);
  }

  //  Check if a user exists using email
  async findUser(email: string): Promise<IUser | null> {
    return findUser(email, this.usersModel);
  }

  //  Check if a user exists using email
  async findUserById(id: string): Promise<IUser> {
    return findUserById(id, this.usersModel);
  }

  // logging in user
  async loginUser(email: string, password: string): Promise<IUser | null> {
    return loginUser(email, this.usersModel)
  }

  async createGoogleUser(newUser: IUser): Promise<StoreData> {
    return createGoogleUser(newUser, this.usersModel)
  }

  async changePassword(email: string, password: string): Promise<boolean> {
    return changePassword(email, password, this.usersModel)
  }
  async getUsers(): Promise<{}[]> {
    return getUsers(
      this.usersModel
    )
  }
  async blockUnblockUser(email: string, state: boolean): Promise<boolean> {
    return blockUnblockUser(
      email,
      state,
      this.usersModel
    )
  }

  async updateUserProfile(id: string, email: string, name: string, mobile: number, uploadedImageName: string): Promise<{}> {
    return updateUserProfile(
      id,
      email,
      name,
      mobile,
      uploadedImageName,
      this.usersModel
    )
  }
  async updateUserProfileWithoutImage(id: string, email: string, name: string, mobile: number): Promise<{}> {
    return updateUserProfileWithoutImage(
      id,
      email,
      name,
      mobile,
      this.usersModel
    )
  }
}