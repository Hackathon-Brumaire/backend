import { NextFunction, Request, Response, Router } from 'express';
import { AnswerController } from '@controllers/answer.controller';

export class AnswerRoute {
  public path = '/answer';
  public router = Router();
  public answerController = new AnswerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:answerId`,
      (req: Request, res: Response, next: NextFunction) =>
        this.answerController.getAnswerById(req, res, next),
    );
    this.router.get(
      `${this.path}/:answerId/next-question`,
      (req: Request, res: Response, next: NextFunction) =>
        this.answerController.getAnswerNextQuestion(req, res, next),
    );
    this.router.get(
      `${this.path}/:answerId/previous-question`,
      (req: Request, res: Response, next: NextFunction) =>
        this.answerController.getAnswerPreviousQuestion(req, res, next),
    );
  }
}
