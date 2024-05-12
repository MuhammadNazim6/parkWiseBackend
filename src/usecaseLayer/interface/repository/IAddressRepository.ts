import { IAddress } from "../../../domainLayer/address";

export interface IAddressRepository{
  createAddress(newAddress:IAddress):Promise<IAddress>;
}