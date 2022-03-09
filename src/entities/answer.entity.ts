import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "@entities/question.entity";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @ManyToOne()
  previousQuestions: Question;
  @ManyToOne()
  nextQuestion: Question;
}
