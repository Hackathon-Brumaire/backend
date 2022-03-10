import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { MediaEntity } from '@entities/media.entity';
import { PartCoordinateEntity } from '@entities/part-coordinate.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @OneToMany(() => AnswerEntity, answer => answer.previousQuestion, {
    eager: true,
    cascade: ['insert'],
  })
  nextAnswers: AnswerEntity[];
  @OneToOne(() => AnswerEntity, answer => answer.nextQuestion)
  previousAnswer: AnswerEntity;
  @ManyToOne(() => MediaEntity, media => media.questions, {
    eager: true,
    nullable: true,
  })
  media: MediaEntity;
  @ManyToMany(
    () => PartCoordinateEntity,
    partCoordinate => partCoordinate.question,
    { nullable: false, eager: true, cascade: ['insert'] },
  )
  @JoinTable({ name: 'question_parts_coordinates' })
  partsCoordinates: PartCoordinateEntity[];
}
