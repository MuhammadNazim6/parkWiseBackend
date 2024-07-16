import { IConversationRepository } from "../../interface/repository/IConversationRepository";

export const getUserChatCount = async (
  convRepository: IConversationRepository,
  userId: string,
): Promise<Number> => {
  try {    
    const count = await convRepository.getUserChatCount(userId)    
    return count
  } catch (error) {
    throw error
  }
}