export type MessageType = 'question' | 'answer';

export interface ConversationHistoric {
  message: string;
  messageType: MessageType;
}

export const socketConversation: Map<string, ConversationHistoric[]> = new Map();
