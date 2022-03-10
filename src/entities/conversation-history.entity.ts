import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConversationHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  roomId: string;
  @Column()
  conversationHistorics: string;
}
