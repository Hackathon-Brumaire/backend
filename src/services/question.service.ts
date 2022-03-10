import { EntityRepository, Repository } from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { QuestionEntity } from '@entities/question.entity';

@EntityRepository()
export class QuestionService extends Repository<QuestionEntity> {
  public async findQuestionById(questionId: number): Promise<QuestionEntity> {
    if (isEmpty(questionId)) throw new HttpException(400, 'no questionId');

    const findQuestion: QuestionEntity = await QuestionEntity.findOne({
      where: { id: questionId },
    });
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion;
  }

  public async findQuestionNextAnswers(
    questionId: number,
  ): Promise<AnswerEntity[]> {
    if (isEmpty(questionId)) throw new HttpException(400, 'no answerId');

    const findQuestion: QuestionEntity =
      await QuestionEntity.createQueryBuilder('question')
        .where('question.id = :questionId', { questionId })
        .leftJoinAndSelect('question.nextAnswers', 'answer')
        .getOne();
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion.nextAnswers;
  }

  public async findQuestionPreviousAnswer(
    questionId: number,
  ): Promise<AnswerEntity> {
    if (isEmpty(questionId)) throw new HttpException(400, 'no answerId');

    const findQuestion: QuestionEntity =
      await QuestionEntity.createQueryBuilder('question')
        .where('question.id = :questionId', { questionId })
        .leftJoinAndSelect('question.previousAnswer', 'answer')
        .getOne();
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion.previousAnswer;
  }
}
