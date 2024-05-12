import { IProviderRepository } from "../../interface/repository/IProviderRepository"
import { IAddressRepository } from "../../interface/repository/IAddressRepository"
import { ISuccessResponse } from "../../interface/services/IResponses"


export const sendLotForApproval = async (
  providerRepository: IProviderRepository,
  addressRepository: IAddressRepository,
  email: string,
  parkingName: string,
  parkingCount: number,
  waterServicePrice: number,
  evChargeFacilityPrice: number,
  airPressureCheckPrice: number,
  oneHourParkingAmount: number,
  // location: {
  //   lng: number,
  //   lat: number
  // },
  latitude: number,
  longitude: number,
  startEndTime: string,

  buildingOrAreaName: string,
  street: string,
  city: string,
  state: string,
  landmark: string,
  country: string,
  pinNumber: number,

): Promise<ISuccessResponse> => {
  try {
    const newAddress = await addressRepository.createAddress({
      buildingOrAreaName,
      street,
      city,
      state,
      landmark,
      country,
      pinNumber
    })

    if (!newAddress) {
      return {
        status: 500,
        success: true,
        message: 'Unable to update the provider address, try later'
      }
    }
    const addressId = newAddress._id;
    // updating provider
    const updatedProvider = await providerRepository.updateProviderWithSlots(
      addressId as string,
      email,
      parkingName,
      parkingCount,
      waterServicePrice,
      evChargeFacilityPrice,
      airPressureCheckPrice,
      oneHourParkingAmount,
      // location,
      latitude,
      longitude,
      startEndTime,
    )
    if (updatedProvider) {
      return {
        status: 200,
        success: true,
        message: 'Updated address and provider info'
      }
    }
    return {
      status: 500,
      success: false,
      message: 'Unable to update the provider profile, try later'
    }

  } catch (error) {
    console.log(error);
    throw error

  }

}