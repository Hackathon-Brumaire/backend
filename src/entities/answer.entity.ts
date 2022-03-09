import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '@entities/question.entity';

@Entity()
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => QuestionEntity, question => question.nextAnswers)
  previousQuestion: QuestionEntity;
  @OneToOne(() => QuestionEntity, question => question.previousAnswer)
  @JoinColumn()
  nextQuestion: QuestionEntity;
}
