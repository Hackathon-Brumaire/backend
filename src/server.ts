import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import { QuestionRoute } from '@routes/question.route';
import { AnswerRoute } from '@routes/answer.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new QuestionRoute(),
  new AnswerRoute(),
]);

app.listen();
