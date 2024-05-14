import { IAdmin } from "../../../domainLayer/admin";
import { IParkingProvider, IParkingProviderReady } from "../../../domainLayer/providers";
import { IUser } from "../../../domainLayer/users";

export interface StoreData {
  _id: string;
  name: string;
  email: string;
}



export interface ILoginResponse<T = IUser | string | IAdmin | IParkingProvider> {
  status: number;
  success: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
  data?:{
    name:string;
    role:string;
    email:string;
    
  } ;
}


export interface IProviderLoginResponse {
  status: number;
  success: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
 data?:{
    name:string;
    role:string;
    email:string;
    approvalStatus:string;
}
}


export interface ILogoutResponse {
  status: number;
  success: boolean;
  message?: string;
}

export interface IBlockUnblockResponse {
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

export interface IRefreshTokenResponse {
  status:number,
  success:boolean,
  message:string,
  accessToken?:string
}