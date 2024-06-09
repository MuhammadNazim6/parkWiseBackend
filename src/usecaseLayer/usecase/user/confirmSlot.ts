import { IBookingRepository } from "../../interface/repository/IBookingRepository";

export const confirmSlot = async (
  bookingRepository: IBookingRepository,
  slots: Array<string>,
  lotId: string,
  date: string
): Promise<{}> => {
  try {
    const filled = await bookingRepository.getBookedSlots(date, lotId) as Array<{ time: string }>

    let alreadyFilled:string[] = []
    slots.forEach((x) => {
      filled.map((slot) => {
        if (slot.time.split('-')[0] === x.split(':')[0]) {
          alreadyFilled.push(x)
        }
      })
    })
    return alreadyFilled
  } catch (error) {
    throw error
  }
}