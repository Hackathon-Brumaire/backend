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
  @Column({ nullable: true })
  link: string;
  @Column({ nullable: true })
  type: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: false })
  label: string;
  @OneToOne(() => AnswerEntity, answer => answer.doc, { nullable: false })
  answer: AnswerEntity;
}
