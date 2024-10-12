import { getMember, getServerMembers, joinServer, kickMember, leaveServer, updateMemberRole } from '@controllers/member.controller';
import { memberRoleDto } from '@dtos/member.dto';
import isAuthenticated from '@middlewares/is-authenticated.middleware';
import { validateData } from '@middlewares/validate-dto.middleware';
import serverRouter from '@routers/server.router';
import tryCatch from '@utils/try-catch.util';
import express from 'express';

const memberRouter = express.Router({mergeParams: true});

// Get all members of a server
memberRouter.get('/', isAuthenticated, tryCatch(getServerMembers));

// Join a server
memberRouter.post('/join', isAuthenticated, tryCatch(joinServer));

// Leave a server
memberRouter.post('/leave', isAuthenticated, tryCatch(leaveServer));

// Get a member by id
memberRouter.get('/:memberId', isAuthenticated, tryCatch(getMember));

// Update the role of a member
memberRouter.put('/:memberId/role', isAuthenticated, validateData(memberRoleDto), tryCatch(updateMemberRole));

// Kick a member
memberRouter.delete('/:memberId/kick', isAuthenticated, tryCatch(kickMember));

export default memberRouter;