import { IAddress } from "../../../domainLayer/address";
import { IAddressRepository } from "../../../usecaseLayer/interface/repository/IAddressRepository";
import AddressModel from "../model/addressModel";
import { createAddress } from "./address/createAddress";

export class AddressRepository implements IAddressRepository {
  constructor(private readonly addressModel: typeof AddressModel) {
  }

  // creating address
  createAddress(newAddress: IAddress): Promise<IAddress> {
    return createAddress(newAddress, this.addressModel)
  }

}