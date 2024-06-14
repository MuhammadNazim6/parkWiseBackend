import { IConversation } from "../../../../domainLayer/conversation";
import ConversationModel from "../../model/conversationModel";

export const getConversation = async (
  conversationModel: typeof ConversationModel,
  firstPersonId: string,
): Promise<IConversation | null> => {
  try {
    const result = await conversationModel.findOne({firstPersonId}).populate('connections.secondPersonId') //needed
    return result
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error
  }
}