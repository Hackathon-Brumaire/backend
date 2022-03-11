import { RoomEntity } from '@/entities/room.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
export class RoomService extends Repository<RoomEntity> {
  public async getAll(): Promise<RoomEntity[]> {
    const roomEntities: RoomEntity[] = await RoomEntity.find({
      where: { status: 'alive' },
    });

    return roomEntities;
  }

  public async createRoom(status: 'alive' | 'dead'): Promise<RoomEntity> {
    return await RoomEntity.create({
      status,
    }).save();
  }

  public async deleteRoom(roomEntity: {
    id: number;
    status: 'alive' | 'dead';
  }): Promise<void> {
    await RoomEntity.delete({
      ...roomEntity,
    });
  }

  public async getRoom(roomEntity: {
    id: number;
    status: 'alive' | 'dead';
  }): Promise<RoomEntity> {
    return await RoomEntity.findOne({
      where: { id: roomEntity.id, status: roomEntity.status },
    });
  }
}
