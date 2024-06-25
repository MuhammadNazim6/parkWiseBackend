import mongoose, { Document, Model, Schema } from 'mongoose';
import { IFeedback } from '../../../domainLayer/feedback';

const FeedbackSchema: Schema = new Schema<IFeedback & Document>({
  parkingLotId: { type: Schema.Types.ObjectId, ref: 'Provider' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number },
  review: { type: String },
  likes: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
  // noted: { type: Boolean, default: false }
}, { timestamps: true })


const FeedbackModel: Model<IFeedback & Document> = mongoose.model<IFeedback & Document>(
  "Feedback",
  FeedbackSchema
);

export default FeedbackModel;
