import { AnswerService } from '@services/answer.service';
import { AnswerEntity } from '@entities/answer.entity';
import { QuestionEntity } from '@entities/question.entity';

export class AnswerController {
  private answerService = new AnswerService();

  getAnswerById(answerId: number): Promise<AnswerEntity> {
    return this.answerService.findAnswerById(answerId);
  }

  getAnswerNextQuestion(answerId: number): Promise<QuestionEntity> {
    return this.answerService.findAnswerNextQuestion(answerId);
  }

  getAnswerPreviousQuestion(answerId: number): Promise<QuestionEntity> {
    return this.answerService.findAnswerPreviousQuestion(answerId);
  }
}
