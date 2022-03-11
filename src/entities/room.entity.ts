import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
}
