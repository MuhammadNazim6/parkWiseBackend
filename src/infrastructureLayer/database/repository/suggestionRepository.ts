import { ISuggestionRepository } from "../../../usecaseLayer/interface/repository/ISuggestionRepository";
import SuggestionModel from "../model/suggestionsModel";
import { addSuggestion } from "./suggestion/addSuggestion";

export class SuggestionRepository implements ISuggestionRepository {
  constructor(private readonly _suggestionModel: typeof SuggestionModel) {
  }
  async addSuggestion(id: string, feedbackType: string, email: string, url: string, message: string): Promise<boolean> {
    return addSuggestion(this._suggestionModel, id, feedbackType, email, url, message);
  }

}