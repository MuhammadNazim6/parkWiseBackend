import { IConversationRepository } from "../../interface/repository/IConversationRepository";

export const getConnections = async (
  firstPersonId: string,
  conversationRepository: IConversationRepository
): Promise<{}[]> => {
  try {
    const conversation = await conversationRepository.getConversation(firstPersonId)
    if (conversation) {
      conversation.connections.sort((a, b) => {
        const dateA = new Date(a.updatedAt)
        const dateB = new Date(b.updatedAt)
        return dateB.getTime() - dateA.getTime();
      });
  
      return conversation.connections
    } else {
      return []
    }
  } catch (error) {
    console.error('Error while sorting the connections')
    throw error
  }
}