import { IUser } from "../../../domainLayer/users";

export interface StoreData {
  _id: string;
  name: string;
  email: string;
}

export interface IForgotPassword {
  email: string;
  password: string;
}

export interface IResponse<T = StoreData | string> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string
}