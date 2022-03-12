import { AnswerService } from '@services/answer.service';
import { QuestionEntity } from '@entities/question.entity';
import { NextFunction, Request, Response } from 'express';
import { AnswerEntity } from '@entities/answer.entity';

export class AnswerController {
  public answerService = new AnswerService();

  async getAnswerById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const answerId = parseInt(req.params.answerId);
      const answer: AnswerEntity = await this.answerService.findAnswerById(
        answerId,
      );

      res.status(200).json(answer);
    } catch (error) {
      next(error);
    }
  }

  async getAnswerNextQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const answerId = parseInt(req.params.answerId);
      const nextQuestion: QuestionEntity =
        await this.answerService.findAnswerNextQuestion(answerId);

      res.status(200).json(nextQuestion);
    } catch (error) {
      next(error);
    }
  }

  async getAnswerPreviousQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const answerId = parseInt(req.params.answerId);
      const previousQuestion: QuestionEntity =
        await this.answerService.findAnswerPreviousQuestion(answerId);

      res.status(200).json(previousQuestion);
    } catch (error) {
      next(error);
    }
  }
}
