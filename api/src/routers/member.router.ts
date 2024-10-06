import { getMember, getServerMembers } from '@controllers/member.controller';
import isAuthenticated from '@middlewares/is-authenticated.middleware';
import tryCatch from '@utils/try-catch.util';
import express from 'express';

const memberRouter = express.Router({mergeParams: true});

// Get all members of a server
memberRouter.get('/', isAuthenticated, tryCatch(getServerMembers));

// Get a member by id
memberRouter.get('/:memberId', isAuthenticated, tryCatch(getMember));

export default memberRouter;