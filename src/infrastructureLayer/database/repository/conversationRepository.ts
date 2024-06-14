import { IConversation } from "../../../domainLayer/conversation";
import { IConversationRepository } from "../../../usecaseLayer/interface/repository/IConversationRepository";
import ConversationModel from "../model/conversationModel";
import { createConversation } from "./conversation/createConversation";
import { getConversation } from "./conversation/getConversation";
import { updateConversation } from "./conversation/updateConversation";

export class ConversationRepository implements IConversationRepository {
  constructor(private readonly conversationModel: typeof ConversationModel) {
  }
  async getConversation(firstPersonId: string): Promise<IConversation | null> {
    return getConversation(this.conversationModel, firstPersonId)
  }
  async createConversation(firstPersonId: string, firstPersonType: string): Promise<boolean> {
    return createConversation(this.conversationModel, firstPersonId, firstPersonType)
  }
  async updateConversation(firstPersonId: string, secondPersonId: string, secondPersonType: string, message: string): Promise<boolean> {
    return updateConversation(this.conversationModel, firstPersonId, secondPersonId, secondPersonType, message)
  }
}