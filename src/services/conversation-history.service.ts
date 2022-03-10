import { ConversationHistoryEntity } from '@/entities/conversation-history.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
export class ConversationHistoryService extends Repository<ConversationHistoryEntity> {
  public async createConversation(
    roomId: string,
    conversationHistory: string,
  ): Promise<ConversationHistoryEntity> {
    return await ConversationHistoryEntity.create({
      ...{ roomId, conversationHistory },
    }).save();
  }

  public async getFromRoomId(
    roomId: string,
  ): Promise<ConversationHistoryEntity[]> {
    return await ConversationHistoryEntity.find({ where: { roomId } });
  }
}
