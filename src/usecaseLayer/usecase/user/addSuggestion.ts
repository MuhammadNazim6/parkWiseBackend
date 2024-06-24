import { ISuggestionRepository } from "../../interface/repository/ISuggestionRepository";


export const addSuggestion = async (
  suggestionRepository: ISuggestionRepository,
  id: string,
  feedbackType: string,
  email: string,
  url: string,
  message: string
): Promise<boolean> => {
  try {
    const feedback = await suggestionRepository.addSuggestion(id, feedbackType, email, url, message)
    return feedback
  } catch (error) {
    throw error
  }

}
