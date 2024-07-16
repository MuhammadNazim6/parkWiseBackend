import { IConversation } from "../../../domainLayer/conversation";

export interface IConversationRepository {
  getConversation(firstPersonId: string): Promise<IConversation | null>;
  createConversation(firstPersonId: string, firstPersonType: string): Promise<boolean>;
  updateConversation(firstPersonId: string, secondPersonId: string, secondPersonType: string, message: string): Promise<boolean>;
  getUserChatCount(firstPersonId: string): Promise<number>;
}