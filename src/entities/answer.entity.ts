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
import { DocEntity } from '@entities/doc.entity';

@Entity()
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(() => QuestionEntity, question => question.nextAnswers, {
    onDelete: 'CASCADE',
  })
  previousQuestion: QuestionEntity;
  @OneToOne(() => QuestionEntity, question => question.previousAnswer, {
    cascade: ['insert'],
  })
  @JoinColumn()
  nextQuestion: QuestionEntity;
  @OneToOne(() => DocEntity, doc => doc.answer, {
    eager: true,
    nullable: true,
    cascade: ['insert'],
  })
  @JoinColumn()
  doc: DocEntity;
}
