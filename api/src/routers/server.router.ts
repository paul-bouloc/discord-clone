import { tryCatch } from '@/utils';
import { createServer, deleteServer, getServer, getUserServers, updateServerBanner, updateServerName } from '@controllers/server.controller';
import { createServerDto, updateServerBannerDto } from '@dtos/server.dto';
import isAuthenticated from '@middlewares/is-authenticated.middleware';
import { validateData } from '@middlewares/validate-dto.middleware';
import express from 'express';

const serverRouter = express.Router();

serverRouter.get('/', isAuthenticated, tryCatch(getUserServers));
serverRouter.get('/:id', isAuthenticated, tryCatch(getServer));
serverRouter.post('/', isAuthenticated, validateData(createServerDto), tryCatch(createServer));
serverRouter.put('/:id/name', isAuthenticated, validateData(createServerDto), tryCatch(updateServerName));
serverRouter.put('/:id/banner', isAuthenticated, validateData(updateServerBannerDto), tryCatch(updateServerBanner));
serverRouter.delete('/:id', isAuthenticated, tryCatch(deleteServer));

export default serverRouter;