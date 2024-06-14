import { IConversation } from "../../../../domainLayer/conversation";
import ConversationModel from "../../model/conversationModel";

export const createConversation = async (
  conversationModel: typeof ConversationModel,
  firstPersonId: string,
  firstPersonType:string
): Promise<boolean> => {
  try {
    const created = await conversationModel.create({ firstPersonId,firstPersonType })
    return created ? true : false
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error
  }
}