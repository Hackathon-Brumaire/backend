import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '@entities/answer.entity';
import { MediaEntity } from '@entities/media.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @OneToMany(() => Question, question => question.nextAnswers)
  nextAnswers: Answer[];
  @OneToOne(() => Answer)
  previousAnswer: Answer;
  @ManyToOne(() => MediaEntity, media => media.questions)
  media: MediaEntity;
}
