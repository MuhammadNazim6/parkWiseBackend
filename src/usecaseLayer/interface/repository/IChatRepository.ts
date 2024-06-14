import { IChat } from "../../../domainLayer/chat";
import { IMessage } from "./ICommonInterfaces";

export interface IChatRepository {
  getMessages(senderId: string, receiverId: string): Promise<IChat[]>;
  saveMessage (messageData: IMessage):Promise<boolean>;

}