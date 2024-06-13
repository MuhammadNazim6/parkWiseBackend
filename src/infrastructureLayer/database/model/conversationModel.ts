import mongoose, { Document, Model, Schema } from 'mongoose';
import { IConversation } from '../../../domainLayer/conversation';

const ConversationSchema: Schema = new Schema<IConversation & Document>({
  firstPersonId: { type: Schema.Types.ObjectId, required: true, refPath: 'firstPersonType' },
  firstPersonType: { type: String, enum: ['User', 'Provider'], required: true },
  connections: [
    {
      secondPersonId: { type: Schema.Types.ObjectId, required: true, refPath: 'connections.secondPersonType' },
      lastMessage: { type: String, trim: true },
      secondPersonType: { type: String, enum: ['User', 'Provider'], required: true },
      updatedAt: { type: Date }
    }],
  unreadMessages: { type: Number, default: 0 }

}, { timestamps: true })

const ConversationModel: Model<IConversation & Document> = mongoose.model<IConversation & Document>(
  "Conversation",
  ConversationSchema
);

export default ConversationModel