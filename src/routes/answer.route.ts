import { Router } from 'express';
import { AnswerController } from '@controllers/answer.controller';

export class AnswerRoute {
  public path = '/answer';
  public router = Router();
  public answerController = new AnswerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.answerController.getAnswerById);
    this.router.get(
      `${this.path}/:id/next-question`,
      this.answerController.getAnswerNextQuestion,
    );
    this.router.get(
      `${this.path}/:id/previous-question`,
      this.answerController.getAnswerPreviousQuestion,
    );
  }
}
