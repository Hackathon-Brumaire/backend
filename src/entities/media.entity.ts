import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from '@entities/question.entity';

@Entity()
export class MediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToMany(() => QuestionEntity, question => question.media)
  questions: QuestionEntity[];
}
