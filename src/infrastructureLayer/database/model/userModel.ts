import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../../../domainLayer/users';

const userSchema: Schema = new Schema<IUser & Document>({
  password: { type: String },
  mobile: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  google: { type: Boolean, default: false },
  isBlocked: { type: Boolean },
  wallet: {
    balance: { type: Number, default: 0 },
    history: {
      type: [
        {
          amount: { type: Number },
          transactionType: { type: String },
        },
      ],
      default: [],
    },
  },
  
}, { timestamps: true });

const UserModel: Model<IUser & Document> = mongoose.model<IUser & Document>(
  "User",
  userSchema
);

export default UserModel;
