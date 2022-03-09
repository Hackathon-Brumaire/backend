import { Router } from 'express';
import { QuestionController } from '@controllers/question.controller';

export class QuestionRoute {
  public path = '/question';
  public router = Router();
  public questionController = new QuestionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      this.questionController.getQuestionById,
    );
    this.router.get(
      `${this.path}/:id/next-answers`,
      this.questionController.getQuestionNextAnswers,
    );
    this.router.get(
      `${this.path}/:id/previous-answer`,
      this.questionController.getQuestionPreviousAnswer,
    );
  }
}
