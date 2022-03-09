import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '@entities/question.entity';

@Entity()
export class MediaEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToMany(() => Question, question => question.media)
  questions: Question[];
}
