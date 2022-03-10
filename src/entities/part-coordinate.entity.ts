import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '@entities/question.entity';

@Entity()
export class PartCoordinateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  x: number;
  @Column()
  y: number;
  @Column()
  description: number;
  @ManyToMany(() => QuestionEntity, question => question.partsCoordinates, {
    nullable: false,
  })
  question: QuestionEntity[];
}
