import mongoose, { Schema, Model, Document } from 'mongoose';
import { IParkingProviderReady } from '../../../domainLayer/providers';

const providerSchema: Schema = new Schema<IParkingProviderReady & Document>({
  name: { type: String },
  password: { type: String },
  mobile: { type: Number },
  email: { type: String },
  waterServicePrice: { type: Number },
  airPressureCheckPrice: { type: Number },
  evChargeFacilityPrice: { type: Number },
  startTime: { type: String },
  availableSpace: { type: Number },
  feedbacks: [{ type: Schema.Types.ObjectId }],    //Object id reference to be given

  parkingName: { type: String },
  pricePerHour: { type: Number },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: false
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  approvalStatus: {
    type: String,
    default: 'false'   //false,true,rejected,pending
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  notifications: [{
    message: { type: String },
    sentAt: { type: Date },
  }],
  endTime: { type: String },
  addressId: { type: Schema.Types.ObjectId, ref: 'Address' },
  requestDate: { type: Date }
});

providerSchema.index({ location: '2dsphere' })

const ParkingProviderModel: Model<IParkingProviderReady & Document> = mongoose.model<IParkingProviderReady & Document>(
  "Provider",
  providerSchema
); 

export default ParkingProviderModel;

