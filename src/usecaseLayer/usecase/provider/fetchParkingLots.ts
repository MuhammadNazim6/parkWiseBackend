import { IFetchParkingLot } from "../../../domainLayer/providers";
import { IProviderRepository } from "../../interface/repository/IProviderRepository";

export const fetchParkingLots = async (
  providerRepository: IProviderRepository,
  searchQuery: IFetchParkingLot

): Promise<{}> => {
  try {
    const parkingLots = await providerRepository.getParkingLotsForHome(searchQuery)
    return parkingLots
  } catch (error) {
    throw error
  }
}