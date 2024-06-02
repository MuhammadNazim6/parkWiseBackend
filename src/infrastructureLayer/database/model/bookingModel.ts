import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBooking } from '../../../domainLayer/booking';

const BookingSchema: Schema = new Schema<IBooking & Document>({
  parkingLotId: { type: Schema.Types.ObjectId, ref: 'Provider' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  selectedSlots: { type: [String], required: true },
  servicesUsed: {
    type: Map,
    of: Boolean,
    required: true
  },
  bookingDate: { type: Date, required: true },
})

const BookingModel: Model<IBooking & Document> = mongoose.model<IBooking & Document>(
  "Booking",
  BookingSchema
);

export default BookingModel
