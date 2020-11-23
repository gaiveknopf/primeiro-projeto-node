import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import SessionController from '../controllers/SessionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const sessionController = new SessionController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', sessionController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
