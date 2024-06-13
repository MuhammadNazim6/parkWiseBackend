import { ObjectId } from "mongoose";

export interface IConversation {
  firstPersonId: ObjectId;
  firstPersonType: String;
  connections: { secondPersonId: ObjectId, lastMessage: string, secondPersonType: string, updatedAt: Date }[];
  unreadMessages: number;
}