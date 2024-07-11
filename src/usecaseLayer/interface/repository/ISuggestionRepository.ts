
export interface ISuggestionRepository {
  addSuggestion(id: string, feedbackType: string, email: string, url: string, message: string): Promise<boolean>
  getAllSuggestions(page:string): Promise<{}>
}
