import mongoose, { Schema, Model, Document } from 'mongoose';
import { IParkingProvider } from '../../../domainLayer/providers';

const providerSchema: Schema = new Schema<IParkingProvider & Document>({
  profile: { type: String },
  mobile: { type: Number },
  services: [{ type: String }],
  startTime: { type: Date },
  name: { type: String },
  password: { type: String },
  availableSpace: { type: String },
  feedbacks: [{ type: Schema.Types.ObjectId }],    //Object id reference to be given
  email: { type: String },
  images: [{ type: String }],
  description: { type: String },
  parkingName: { type: String },
  pricePerHour: { type: String },
  nearbyAttractions: { type: String },
  location: {
    coordinates: [{ type: Number }],
    type: { type: String },
  },
  parkingRules: { type: String },
  isApproved: { type: Boolean },
  notifications: [{
    message: { type: String },
    sentAt: { type: Date },
  }],
  endTime: { type: Date },
});



const ParkingProviderModel: Model<IParkingProvider & Document> = mongoose.model<IParkingProvider & Document>(
  "Admin",
  providerSchema
);

export default ParkingProviderModel;

