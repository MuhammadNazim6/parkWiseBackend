import { ObjectId } from "mongoose";

export interface ISuggestions {
  id: string;
  email: string;
  feedbackType: string;
  url: string;
  message: string
}
