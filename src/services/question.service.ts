import { EntityRepository, getManager, Repository } from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { QuestionEntity } from '@entities/question.entity';

@EntityRepository()
export class QuestionService extends Repository<QuestionEntity> {
  public async createQuestion(
    questionData: QuestionEntity,
  ): Promise<QuestionEntity> {
    if (isEmpty(questionData)) throw new HttpException(400, 'is empty data');
    await QuestionEntity.delete({});
    await getManager().query(
      `ALTER SEQUENCE question_entity_id_seq RESTART WITH 1`,
    );

    return await QuestionEntity.create({
      ...questionData,
    }).save();
  }

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
