import { ObjectId, Document } from "mongoose";

export interface IAdmin  extends Document{
  _id: ObjectId;
  name: string | null;
  password: string | null;
  email: string | null;
  role: string | null;
}
