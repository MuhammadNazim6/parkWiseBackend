import { IChat } from "../../../../domainLayer/chat";
import { IMessage } from "../../../../usecaseLayer/interface/repository/ICommonInterfaces";
import ChatModel from "../../model/chatModel";

export const saveMessage = async (
  chatModel: typeof ChatModel,
  messageData: IMessage
): Promise<boolean> => {
  try {
    // const { senderId, senderType, receiverId, receiverType, message, messageType } = messageData
    console.log(messageData);
    
    const messageSaved = await chatModel.create(messageData)
    return messageSaved ? true : false
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error
  }
}