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
  @ManyToOne(() => QuestionEntity, question => question.nextAnswers)
  previousQuestions: QuestionEntity;
  @OneToOne(() => QuestionEntity, question => question.previousAnswer)
  nextQuestion: QuestionEntity;
}
