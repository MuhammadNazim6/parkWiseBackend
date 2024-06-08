import { ObjectId } from "mongoose";
import { IUser } from "../../../domainLayer/users";
import { IFile } from "../../../infrastructureLayer/middleware/multer";
import { StoreData } from "../services/IResponses";
// import { IBlockUnblockResponse } from "../services/IResponses";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<StoreData>;
  findUser(email: string): Promise<IUser | null>;
  findUserById(id: string): Promise<IUser>;
  loginUser(email: string, password: string): Promise<IUser | null>;
  createGoogleUser(newUser: IUser): Promise<StoreData>;
  changePassword(email: string, password: string): Promise<boolean>;
  getUsers(): Promise<{}[]>;
  blockUnblockUser(email: string, status: boolean): Promise<boolean>;
  updateUserProfile(id: string, email: string, name: string, mobile: number, uploadedImageName: string): Promise<{}>;
  updateUserProfileWithoutImage(id: string, email: string, name: string, mobile: number): Promise<{}>;
  refundCashToUser(userId: ObjectId,amount:number): Promise<{}>;
}  