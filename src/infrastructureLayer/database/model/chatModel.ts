import mongoose, { Document, Model, Schema } from 'mongoose';
import { IChat } from '../../../domainLayer/chat';

const ChatSchema: Schema = new Schema<IChat & Document>({
  senderId: { type: Schema.Types.ObjectId, required: true, refPath: 'senderType' },
  senderType: { type: String, enum: ['User', 'Provider'], required: true },
  receiverId: { type: Schema.Types.ObjectId, required: true, refPath: 'receiverType' },
  receiverType: { type: String, enum: ['User', 'Provider'], required: true },
  message: { type: String, required: true }
}, { timestamps: true })

const ChatModel: Model<IChat & Document> = mongoose.model<IChat & Document>(
  "Chat",
  ChatSchema
);

export default ChatModel