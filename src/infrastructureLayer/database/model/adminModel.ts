import mongoose, { Document, Model, Schema } from 'mongoose';
import { IAdmin } from '../../../domainLayer/admin';

const AdminSchema: Schema = new Schema<IAdmin & Document>({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String },
});


const AdminModel: Model<IAdmin & Document> = mongoose.model<IAdmin & Document>(
  "Admin",
  AdminSchema
);

export default AdminModel;

