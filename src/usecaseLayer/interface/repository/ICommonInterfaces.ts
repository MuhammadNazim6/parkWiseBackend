
export interface ISlotBooking {
  lotId: string;
  userId: string;
  services: {
    airPressure: boolean
    evCharging: boolean
    waterService: boolean
  };
  selectedSlots: Set<string>;
  amount: number;
  bookingDate:Date
}