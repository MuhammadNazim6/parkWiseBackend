import { IConversation } from "../../../domainLayer/conversation";
import { IConversationRepository } from "../../../usecaseLayer/interface/repository/IConversationRepository";
import ConversationModel from "../model/conversationModel";
import { getConversation } from "./conversation/getConversation";

export class ConversationRepository implements IConversationRepository {
  constructor(private readonly conversationModel: typeof ConversationModel) {
  }
  async getConversation(firstPersonId: string): Promise<IConversation | null> {
    return getConversation(this.conversationModel, firstPersonId)
  }
}