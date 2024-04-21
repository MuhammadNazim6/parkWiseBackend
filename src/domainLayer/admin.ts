import { ObjectId } from "mongoose";

export interface IAdmin {
  _id?: ObjectId;
  name: string | null;
  password: string | null;
  email: string | null;
  role: string | null;
}
