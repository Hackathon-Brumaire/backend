import { ConversationHistoryEntity } from '@/entities/conversation-history.entity';
import { HttpException } from '@/exceptions/HttpException';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
export class ConversationHistoryService extends Repository<ConversationHistoryEntity> {
  public async createConversation(
    roomId: string,
    conversationHistory: string,
  ): Promise<ConversationHistoryEntity> {
    return await ConversationHistoryEntity.create({
      ...{ roomId, conversationHistorics: conversationHistory },
    }).save();
  }

  public async getFromRoomId(
    roomId: string,
  ): Promise<ConversationHistoryEntity> {
    const conversationHistoryEntity = await ConversationHistoryEntity.findOne({
      where: { roomId },
    });
    if (!conversationHistoryEntity) {
      throw new HttpException(400, 'not valid');
    }

    return conversationHistoryEntity;
  }
}
