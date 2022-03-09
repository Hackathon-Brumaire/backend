import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Question } from '@entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @ManyToOne(() => Answer, answer => answer.previousQuestions)
  previousQuestions: Question;
  @OneToOne(() => Question)
  nextQuestion: Question;
}
