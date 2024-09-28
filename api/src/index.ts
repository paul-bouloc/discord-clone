
import * as dotenv from 'dotenv'
import http from 'http';
import validateEnv from './utils/validate-env.util';
import app from './app';
import serverErrorHandler from './utils/server-error-handler.util';

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3000;

app.set('port', PORT);

const server = http.createServer(app);

server.on('error', serverErrorHandler);
server.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
})

server.listen(PORT);