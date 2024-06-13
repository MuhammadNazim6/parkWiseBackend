import { IConversation } from "../../../domainLayer/conversation";

export interface IConversationRepository {
  getConversation(firstPersonId: string): Promise<IConversation | null>;

}