import { EntityRepository, Repository } from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { QuestionEntity } from '@entities/question.entity';

@EntityRepository()
export class AnswerService extends Repository<AnswerEntity> {
  public async findAnswerById(answerId: number): Promise<AnswerEntity> {
    if (isEmpty(answerId)) throw new HttpException(400, 'no answerId');

    const findAnswer: AnswerEntity = await AnswerEntity.findOne({
      where: { id: answerId },
    });
    if (!findAnswer) throw new HttpException(409, 'not valid');

    return findAnswer;
  }

  public async findAnswerNextQuestion(
    answerId: number,
  ): Promise<QuestionEntity> {
    if (isEmpty(answerId)) throw new HttpException(400, 'no answerId');

    const findAnswer: AnswerEntity = await AnswerEntity.createQueryBuilder(
      'answer',
    )
      .where('answer.id = :answerId', { answerId })
      .leftJoinAndSelect('answer.nextQuestion', 'question')
      .getOne();
    if (!findAnswer) throw new HttpException(409, 'not valid');

    return findAnswer.nextQuestion;
  }

  public async findAnswerPreviousQuestions(
    answerId: number,
  ): Promise<QuestionEntity> {
    if (isEmpty(answerId)) throw new HttpException(400, 'no answerId');

    const findAnswer: AnswerEntity = await AnswerEntity.createQueryBuilder(
      'answer',
    )
      .where('answer.id = :answerId', { answerId })
      .leftJoinAndSelect('answer.previousQuestions', 'question')
      .getOne();
    if (!findAnswer) throw new HttpException(409, 'not valid');

    return findAnswer.previousQuestions;
  }
}
