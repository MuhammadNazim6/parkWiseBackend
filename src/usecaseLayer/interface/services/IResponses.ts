import { IAdmin } from "../../../domainLayer/admin";
import { IParkingProvider } from "../../../domainLayer/providers";
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


export interface ILoginResponse<T = IUser | string | IAdmin | IParkingProvider> {
  status: number;
  success: boolean;
  message?: string;
  token?: string
  data?:{
    name:string;
    role:string;
    email:string;
  } ;
}



export interface ILogoutResponse {
  status: number;
  success: boolean;
  message?: string;
}

export interface IOtpSendResponse {
  status: number;
  success: boolean;
  message?:string;
  
}

export interface IOtpDocSaveResponse{
  email: string;
  role: string;
  otp:string;
  expiry_at:Date
}

export interface IErrorResponse{
  status:number;
  success:boolean;
  message:string;
}

export interface ISuccessResponse{
  status:number;
  success:boolean;
  message:string;
}

// export interface ICommonLoginResponse{
//   status:number;
//   success:boolean;
//   message:string;
//   role:string;
//   token:string;
// }