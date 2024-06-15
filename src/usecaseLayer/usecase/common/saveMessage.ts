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
    const conversationFirstPerson = await conversationRepository.getConversation(messageData.senderId)
    if (!conversationFirstPerson) {
      await conversationRepository.createConversation(messageData.senderId, messageData.senderType)
    }

    const conversationSecondPerson = await conversationRepository.getConversation(messageData.receiverId)
    if (!conversationSecondPerson) {
      await conversationRepository.createConversation(messageData.receiverId, messageData.receiverType)
    }

    await conversationRepository.updateConversation(messageData.senderId, messageData.receiverId, messageData.receiverType, messageData.message)
    await conversationRepository.updateConversation(messageData.receiverId, messageData.senderId, messageData.senderType, messageData.message)

    return saved
  } catch {
    console.error('Error while saving messages');
    throw Error
  }
}