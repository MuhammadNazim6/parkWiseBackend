import ConversationModel from "../../model/conversationModel";

export const updateConversation = async (
  conversationModel: typeof ConversationModel,
  firstPersonId: string,
  secondPersonId: string,
  secondPersonType: string,
  message: string
): Promise<boolean> => {
  try {
    const conversation = await conversationModel.findOne({ firstPersonId })
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    let connIndex = conversation.connections.findIndex((conn) => conn.secondPersonId.toString() === secondPersonId)
    if (connIndex != -1) {
      conversation.connections[connIndex].secondPersonType = secondPersonType
      conversation.connections[connIndex].lastMessage = message
      conversation.connections[connIndex].updatedAt = new Date()
    } else {
      conversation.connections.push({
        secondPersonId, lastMessage: message, secondPersonType, updatedAt: new Date()
      })
    }

    await conversation.save();
    return true
  } catch (error) {
    console.error('Error updating conversation:', error);
    throw error
  }
}