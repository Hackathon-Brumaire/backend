import { ConversationHistoryService } from '@/services/conversation-history.service';

export class ConversationHistoryController {
  private conversationHistoryService = new ConversationHistoryService();

  async getByRoomId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const roomId = Number(req.params.id);
    try {
      const conversationHistoryEntities =
        await this.conversationHistoryService.getFromRoomId(roomId.toString());
      conversationHistoryEntities.conversationHistorics = JSON.parse(
        conversationHistoryEntities.conversationHistorics,
      );
      res.status(200).json(conversationHistoryEntities);
    } catch (error) {
      next(error);
    }
  }
}
