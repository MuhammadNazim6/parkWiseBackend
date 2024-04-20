import mongoose, { Schema } from 'mongoose';
import { IAdmin } from '../../../domainLayer/admin';

const AdminSchema: Schema = new Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String },
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
