import bodyParser from 'body-parser';
import express from 'express';
import { readFileSync } from 'fs-extra';
import Helmet from 'helmet';
import * as https from 'https';
import morgan from 'morgan';
import path from 'path';
import { router } from './routes';
import { setJsonHeaders } from './routes/util-middleware';

const httpsPort = 3443;
const pathToKey = path.resolve('certs', 'server_key.pem');
const pathToCert = path.resolve('certs', 'server_crt.pem');
const pathToDHStrong = path.resolve('certs', 'dh-strong.pem');
const options = {
  key: readFileSync(pathToKey),
  cert: readFileSync(pathToCert),
  dhparam: readFileSync(pathToDHStrong),
};

const server = express();

server.use(morgan(':method :url :status - :response-time ms'));

server.use(bodyParser.json());

server.use(Helmet());

server.use('/api', setJsonHeaders, router);

// const httpPort = 3001;
// server.listen(httpPort, () => {
//   console.log(`Server is running at http://localhost:${httpPort}`);
// });

https.createServer(options, server).listen(httpsPort, () => {
  console.log(`Server is running at https://localhost:${httpsPort}`);
});
