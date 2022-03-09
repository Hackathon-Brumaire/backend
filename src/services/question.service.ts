import { EntityRepository, Repository } from 'typeorm';
import { AnswerEntity } from '@entities/answer.entity';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { QuestionEntity } from '@entities/question.entity';

@EntityRepository()
export class QuestionService extends Repository<QuestionEntity> {
  public async findQuestionById(projectId: number): Promise<QuestionEntity> {
    if (isEmpty(projectId)) throw new HttpException(400, 'no projectId');

    const findQuestion: QuestionEntity = await QuestionEntity.findOne({
      where: { id: projectId },
    });
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion;
  }

  public async findQuestionNextAnswers(projectId: number): Promise<AnswerEntity[]> {
    if (isEmpty(projectId)) throw new HttpException(400, 'no answerId');

    const findQuestion: QuestionEntity = await QuestionEntity.createQueryBuilder('project')
      .where('project.id = :projectId', { projectId })
      .leftJoinAndSelect('project.nextQuestion', 'question')
      .getOne();
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion.nextAnswers;
  }

  public async findQuestionPreviousAnswer(projectId: number): Promise<AnswerEntity> {
    if (isEmpty(projectId)) throw new HttpException(400, 'no answerId');

    const findQuestion: QuestionEntity = await QuestionEntity.createQueryBuilder('project')
      .where('project.id = :projectId', { projectId })
      .leftJoinAndSelect('project.previousAnswer', 'question')
      .getOne();
    if (!findQuestion) throw new HttpException(409, 'not valid');

    return findQuestion.previousAnswer;
  }
}
