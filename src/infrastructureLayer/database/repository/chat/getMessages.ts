import { IChat } from "../../../../domainLayer/chat";
import ChatModel from "../../model/chatModel";

export const getMessages = async (
  chatModel: typeof ChatModel,
  senderId: string,
  receiverId: string
): Promise<IChat[]> => {
  try {
    const result = await chatModel.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });
    return result
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error
  }
}