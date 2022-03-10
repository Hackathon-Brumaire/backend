import { QuestionService } from '@services/question.service';
import { QuestionEntity } from '@entities/question.entity';
import { AnswerEntity } from '@entities/answer.entity';
import { NextFunction, Request, Response } from 'express';

export class QuestionController {
  private questionService = new QuestionService();

  async createQuestion(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const questionData = req.body;
      const question: QuestionEntity =
        await this.questionService.createQuestion(questionData);

      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const questionId = parseInt(req.params.questionId);
      const question: QuestionEntity =
        await this.questionService.findQuestionById(questionId);

      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionNextAnswers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const questionId = parseInt(req.params.questionId);
      const question: AnswerEntity[] =
        await this.questionService.findQuestionNextAnswers(questionId);

      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }

  async getQuestionPreviousAnswer(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const questionId = parseInt(req.params.questionId);
      const question: AnswerEntity =
        await this.questionService.findQuestionPreviousAnswer(questionId);

      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
}
