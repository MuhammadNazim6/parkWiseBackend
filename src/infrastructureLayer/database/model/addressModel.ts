import mongoose, { Document, Model, Schema } from 'mongoose';
import { IAddress } from '../../../domainLayer/address';

const AddressSchema: Schema = new Schema<IAddress & Document>({
  buildingOrAreaName:  { type: String },
  street:  { type: String },
  city:  { type: String },
  state:  { type: String },
  landmark: { type: String },
  country:  { type: String },
  pinNumber: { type: Number },
})

const AddressModel: Model<IAddress & Document> = mongoose.model<IAddress & Document>(
  "Address",
  AddressSchema
);

export default AddressModel;