import { ObjectId } from "mongoose";

export interface IConversation {
  firstPersonId: ObjectId;
  firstPersonType: String;
  connections: { secondPersonId: string, lastMessage: string, secondPersonType: string, updatedAt: Date }[];
  unreadMessages: number;
}