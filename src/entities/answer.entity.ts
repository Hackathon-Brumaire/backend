import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '@entities/question.entity';

@Entity()
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @ManyToOne(() => AnswerEntity, answer => answer.previousQuestions)
  previousQuestions: QuestionEntity;
  @OneToOne(() => QuestionEntity)
  nextQuestion: QuestionEntity;
}
