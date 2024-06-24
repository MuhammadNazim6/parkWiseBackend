import mongoose, { Document, Model, Schema } from 'mongoose';
import { ISuggestions } from '../../../domainLayer/suggestions';

const SuggestionSchema: Schema = new Schema<ISuggestions & Document>({
  id: { type: String },
  feedbackType: { type: String },
  email: { type: String },
  url: { type: String },
  message: { type: String },
}, { timestamps: true })


const SuggestionModel: Model<ISuggestions & Document> = mongoose.model<ISuggestions & Document>(
  "Suggestion",
  SuggestionSchema
);

export default SuggestionModel;
