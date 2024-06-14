import { IChat } from "../../../domainLayer/chat";
import { IChatRepository } from "../../../usecaseLayer/interface/repository/IChatRepository";
import { IMessage } from "../../../usecaseLayer/interface/repository/ICommonInterfaces";
import ChatModel from "../model/chatModel";
import { getMessages } from "./chat/getMessages";
import { saveMessage } from "./chat/saveMessage";


export class ChatRepository implements IChatRepository {
  constructor(private readonly chatModel: typeof ChatModel) {
  }
  async getMessages(senderId: string, receiverId: string): Promise<IChat[]> {
    return getMessages(this.chatModel, senderId, receiverId,);
  }
  async saveMessage(messageData:IMessage): Promise<boolean> {
    return saveMessage(this.chatModel, messageData);
  }
}
