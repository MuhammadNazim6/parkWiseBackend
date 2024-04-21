import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../../../domainLayer/users';

const userSchema: Schema = new Schema<IUser & Document>({
  password: { type: String, required: true },
  mobile: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  bookingHistory: [{
    amount: { type: Number },
    date: { type: Date },
    duration: { type: String },
    parkingLotId: { type: Schema.Types.ObjectId },  //Object id reference to be given
    servicesTaken: [{ type: String, }],
  }],
  status: { type: Boolean },
  favParkingLots: [{ type: Schema.Types.ObjectId }],     //Object id reference to be given
  wallet: {
    balance: { type: Number },
    history: {
      amount: { type: Number },
      transactionType: { type: String },
    },
  },
  joinedAt: { type: Date },
  reports: [{
    providerId: { type: Schema.Types.ObjectId, },     //Object id reference to be given
    reason: { type: String },
  }]
});


const UserModel: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);

export default UserModel;
