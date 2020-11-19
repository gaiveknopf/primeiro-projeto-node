import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { sign } from 'jsonwebtoken';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { name, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    name,
    password,
  });

  delete user.usu_senha;

  return response.json({ user, token });
});

export default sessionsRouter;
