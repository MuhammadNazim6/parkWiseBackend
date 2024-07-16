import { IConversation } from "../../../../domainLayer/conversation"
import ConversationModel from "../../model/conversationModel"

export const getUserChatCount = async (
  convModel: typeof ConversationModel,
  firstPersonId: string
): Promise<number> => {
  try {
    const count = await convModel.findOne({ firstPersonId }) as IConversation
    if (count) {
      return count.connections.length;
    }
    return 0
  } catch (error) {
    throw error
  }
}