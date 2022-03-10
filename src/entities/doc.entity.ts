import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';

@Entity()
export class DocEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  link: string;
  @Column()
  type: string;
  @Column()
  description: string;
  @Column()
  label: string;
  @OneToOne(() => AnswerEntity, answer => answer.doc, { nullable: false })
  answer: AnswerEntity;
}
