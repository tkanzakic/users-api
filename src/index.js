import Koa from 'koa';
import { routes } from './routes';
import { authenticate } from './handlers/auth';

const app = new Koa();

app.use(authenticate);
routes(app);

app.listen(3000);
