import { ISuggestionRepository } from "../../interface/repository/ISuggestionRepository"

export const getSuggestions = async (
  suggestionRepository: ISuggestionRepository,
  page:string
): Promise<{}> => {
  try {
    const data = await suggestionRepository.getAllSuggestions(page)    
    return data
  } catch (error) {
    throw error
  }

}