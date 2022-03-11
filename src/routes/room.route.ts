import { RoomController } from '@/controllers/room.controller';
import { NextFunction, Request, Response, Router } from 'express';

export class RoomRoute {
  public path = '/rooms';
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.roomController.getRooms(req, res, next),
    );
  }
}
