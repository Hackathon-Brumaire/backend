import { ConversationHistoryController } from '@/controllers/conversation-history.controller';
import { RoomController } from '@/controllers/room.controller';
import { NextFunction, Request, Response, Router } from 'express';

export class ConversationHistoryRoute {
  public path = '/conversations';
  public router = Router();
  public conversationHistoryController = new ConversationHistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/rooms/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.conversationHistoryController.getByRoomId(req, res, next),
    );
  }
}
