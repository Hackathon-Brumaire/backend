import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { MediaEntity } from '@entities/media.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @OneToMany(() => AnswerEntity, answer => answer.previousQuestion, {
    eager: true,
    cascade: true,
  })
  nextAnswers: AnswerEntity[];
  @OneToOne(() => AnswerEntity, answer => answer.nextQuestion, {
    cascade: true,
  })
  previousAnswer: AnswerEntity;
  @ManyToOne(() => MediaEntity, media => media.questions, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  media: MediaEntity;
    question: { id: number; title: string; nextAnswers: { id: Number; title: string; doc?: string; }[]; };
    question: { id: number; title: string; nextAnswers: { id: Number; title: string; doc?: string; }[]; };
}
