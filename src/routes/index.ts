import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import areaConfigRouter from './areaconfig.routes';
import funcionarioRouter from './funcionario.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/areaconfig', areaConfigRouter);
routes.use('/funcionario', funcionarioRouter);

export default routes;
