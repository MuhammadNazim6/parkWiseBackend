import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBooking } from '../../../domainLayer/booking';

const BookingSchema: Schema = new Schema<IBooking & Document>({
  parkingLotId: { type: Schema.Types.ObjectId, ref: 'Provider' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  fromTime: { type: String },
  toTime: { type: String },
  servicesUsed: { type: [String], default: [] },
  // paymentMethod: { type: String }
})

const BookingModel: Model<IBooking & Document> = mongoose.model<IBooking & Document>(
  "Booking",
  BookingSchema
);

export default BookingModel
