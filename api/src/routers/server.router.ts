import { getServerMembers, joinServer, leaveServer } from '@controllers/member.controller';
import { createServer, deleteServer, getServer, getUserServers, updateServerBanner, updateServerName } from '@controllers/server.controller';
import { createServerDto, updateServerBannerDto } from '@dtos/server.dto';
import isAuthenticated from '@middlewares/is-authenticated.middleware';
import { validateData } from '@middlewares/validate-dto.middleware';
import tryCatch from '@utils/try-catch.util';
import express from 'express';

const serverRouter = express.Router();

// Get all servers of the user
serverRouter.get('/', isAuthenticated, tryCatch(getUserServers));

// Get a server by id
serverRouter.get('/:id', isAuthenticated, tryCatch(getServer));

// Get all members of a server
serverRouter.get('/:id/members', isAuthenticated, tryCatch(getServerMembers));

// Create a server
serverRouter.post('/', isAuthenticated, validateData(createServerDto), tryCatch(createServer));

// Join a server
serverRouter.post('/:id/join', isAuthenticated, tryCatch(joinServer));

// Leave a server
serverRouter.post('/:id/leave', isAuthenticated, tryCatch(leaveServer));

// Update the name of the server
serverRouter.put('/:id/name', isAuthenticated, validateData(createServerDto), tryCatch(updateServerName));

// Update the banner of the server
serverRouter.put('/:id/banner', isAuthenticated, validateData(updateServerBannerDto), tryCatch(updateServerBanner));

// Delete a server
serverRouter.delete('/:id', isAuthenticated, tryCatch(deleteServer));

export default serverRouter;