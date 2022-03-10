export type MessageType = 'question' | 'answer';

export interface ConversationHistoric {
  message: string;
  messageType: MessageType;
  createdAt: number;
}

export const socketConversation: Map<string, ConversationHistoric[]> = new Map();
