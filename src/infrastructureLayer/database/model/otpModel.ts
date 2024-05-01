import mongoose, { Schema, Model, Document } from "mongoose";
import { IOtp } from '../../../domainLayer/otps';

const otpSchema: Schema = new Schema<IOtp & Document>({
  email: { type: String },
  otp: { type: String },
  role: { type: String },
  expiry_at: { type: Date }
});

const OtpModel: Model<IOtp & Document> = mongoose.model<IOtp & Document>(
  "Otp",
  otpSchema
);

export default OtpModel