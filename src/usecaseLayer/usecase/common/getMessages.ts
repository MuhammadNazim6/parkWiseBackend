import { IChatRepository } from "../../interface/repository/IChatRepository";

export const getMessages = async (
  senderId: string,
  receiverId: string,
  chatRepository: IChatRepository
): Promise<{}[]> => {
  try {
    console.log(3);

    const messages = await chatRepository.getMessages(senderId,receiverId)
    messages.sort((a,b)=>{
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateA.getTime() -  dateB.getTime();
    })
    return messages
  } catch {
    console.error('Error while fetching messages');
    throw Error
  }
}