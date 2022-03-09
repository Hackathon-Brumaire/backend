import { QuestionService } from '@services/question.service';
import { QuestionEntity } from '@entities/question.entity';
import { AnswerEntity } from '@entities/answer.entity';

export class QuestionController {
  private questionService = new QuestionService();

  getQuestionById(questionId: number): Promise<QuestionEntity> {
    return this.questionService.findQuestionById(questionId);
  }

  getQuestionNextAnswers(questionId: number): Promise<AnswerEntity[]> {
    return this.questionService.findQuestionNextAnswers(questionId);
  }

  getQuestionPreviousAnswer(questionId: number): Promise<AnswerEntity> {
    return this.questionService.findQuestionPreviousAnswer(questionId);
  }
}
