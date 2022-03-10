import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('enum')
  status: 'alive' | 'dead';
}
