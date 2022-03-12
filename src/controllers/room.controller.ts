import { NextFunction, Request, Response } from 'express';
import { RoomEntity } from '@/entities/room.entity';
import { RoomService } from '@/services/room.service';

export class RoomController {
  private roomService = new RoomService();

  async getRooms(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const roomEntities: RoomEntity[] = await this.roomService.getAll();
      
      res.status(200).json(roomEntities);
    } catch (error) {
      next(error);
    }
  }
}
