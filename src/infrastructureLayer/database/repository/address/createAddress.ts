import { IAddress } from "../../../../domainLayer/address"
import AddressModel from "../../model/addressModel"

export const createAddress = async (
  newAddress:IAddress,
  addressModel: typeof AddressModel
)=> {
  try {
    const addressCreated = await addressModel.create(newAddress)
    return addressCreated
  } catch (error) {
    throw error
  }
}