import { ObjectId } from "mongoose";

export interface IChat {
  senderId: ObjectId;
  senderType: string,
  receiverId: ObjectId;
  receiverType: string;
  message: string;
} 