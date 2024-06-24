import SuggestionModel from "../../model/suggestionsModel";

export const addSuggestion = async (
  suggestionModel: typeof SuggestionModel,
  id: string,
  feedbackType: string,
  email: string,
  url: string,
  message: string
): Promise<boolean> => {
  try {
    const added = await suggestionModel.create({ id, feedbackType, email, url, message })
    console.log(added);

    return true
  } catch (error) {
    console.log(error);
    throw error
  }
}