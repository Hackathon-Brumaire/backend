import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '@entities/question.entity';

@Entity()
export class MediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  lien: string;
  @OneToMany(() => QuestionEntity, question => question.media)
  questions: QuestionEntity[];
}
