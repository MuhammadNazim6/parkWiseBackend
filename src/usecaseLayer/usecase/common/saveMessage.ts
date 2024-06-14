import { IChatRepository } from "../../interface/repository/IChatRepository";
import { IMessage } from "../../interface/repository/ICommonInterfaces";
import { IConversationRepository } from "../../interface/repository/IConversationRepository";

export const saveMessage = async (
  messageData: IMessage,
  chatRepository: IChatRepository,
  conversationRepository: IConversationRepository
): Promise<{}> => {
  try {
    const saved = await chatRepository.saveMessage(messageData)
    const conversation = await conversationRepository.getConversation(messageData.senderId)
    if (!conversation) {
      await conversationRepository.createConversation(messageData.senderId, messageData.senderType)
    }
    await conversationRepository.updateConversation(messageData.senderId, messageData.receiverId, messageData.receiverType, messageData.message)

    return saved
  } catch {
    console.error('Error while saving messages');
    throw Error
  }
}