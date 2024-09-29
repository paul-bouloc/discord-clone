

import * as dotenv from 'dotenv';
import http from 'http';
import app from './app';
import { serverErrorHandler, validateEnv } from '@/utils';

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3000;

app.set('port', PORT)

const server = http.createServer(app);

server.on('error', serverErrorHandler);
server.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
})

server.listen(PORT);