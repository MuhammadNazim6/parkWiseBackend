
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
  bookingDate: Date
}

export interface IConfirmAvailablityOfSlots {
  slots: Array<string>, lotId: string, date: string
}

export interface IMessage {
  senderId: string;
  receiverId: string;
  senderType: string;
  receiverType: string;
  message: string;
  messageType: string;
}

export interface IAddFeedback {
  userId: string;
  parkingLotId: string;
  rating: number;
  review: string;
}

export interface IUpdateParkingLot {
  airPressureCheckPrice:number;
  waterServicePrice:number;
  evChargeFacilityPrice:number;
  pricePerHour:number;
  availableSpace:number;
}