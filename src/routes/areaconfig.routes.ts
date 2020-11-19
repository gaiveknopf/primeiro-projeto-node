import { Router } from 'express';
import { getRepository } from 'typeorm';
import AreaConfig from '../models/AreaConfig';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const areaConfigRouter = Router();

areaConfigRouter.use(ensureAuthenticated);

areaConfigRouter.get('/', async (request, response) => {
  const areaConfigRepository = getRepository(AreaConfig);

  const areaConfig = await areaConfigRepository.find();

  return response.json(areaConfig);
});

export default areaConfigRouter;
