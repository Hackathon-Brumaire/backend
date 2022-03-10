import { NextFunction, Request, Response, Router } from 'express';
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
      `${this.path}/:questionId`,
      (req: Request, res: Response, next: NextFunction) =>
        this.questionController.getQuestionById(req, res, next),
    );
    this.router.get(
      `${this.path}/:questionId/next-answers`,
      (req: Request, res: Response, next: NextFunction) =>
        this.questionController.getQuestionNextAnswers(req, res, next),
    );
    this.router.get(
      `${this.path}/:questionId/previous-answer`,
      (req: Request, res: Response, next: NextFunction) =>
        this.questionController.getQuestionPreviousAnswer(req, res, next),
    );
  }
}
