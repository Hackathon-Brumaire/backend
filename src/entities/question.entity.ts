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
  @OneToMany(() => AnswerEntity, answer => answer.previousQuestion)
  nextAnswers: AnswerEntity[];
  @OneToOne(() => AnswerEntity, answer => answer.nextQuestion)
  previousAnswer: AnswerEntity;
  @ManyToOne(() => MediaEntity, media => media.questions, { eager: true })
  media: MediaEntity;
}
