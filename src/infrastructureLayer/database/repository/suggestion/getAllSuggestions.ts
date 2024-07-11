import { ISuggestions } from "../../../../domainLayer/suggestions";
import SuggestionModel from "../../model/suggestionsModel";

export const getAllSuggestions = async (
  suggesttionModel: typeof SuggestionModel,
  page: string
): Promise<{}> => {
  try {
    const pageInt = parseInt(page)
    const limit = 4;
    const skip = (pageInt - 1) * limit;

    const suggestions = await suggesttionModel.find().skip(skip).limit(limit);
    const totalCount = await suggesttionModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const data = {
      suggestions,
      totalPages
    }
    
    return data
  } catch (error) {
    throw error
  }
}