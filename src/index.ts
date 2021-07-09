import bodyParser from 'body-parser';
import express from 'express';
import Helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes';
import { setJsonHeaders, unknownEndpoint } from './routes/util-middleware';

// const httpsPort = 3443;
// const pathToKey = path.resolve('certs', 'server.key');
// const pathToCert = path.resolve('certs', 'server.crt');
// const pathToDHStrong = path.resolve('certs', 'dh-strong.pem');
// const options: ServerOptions = {
//   key: readFileSync(pathToKey),
//   cert: readFileSync(pathToCert),
//   dhparam: readFileSync(pathToDHStrong),
// };

const server = express();

server.use(morgan(':method :url :status - :response-time ms'));

server.use(bodyParser.json());

server.use(Helmet());

// server.use(requestLogger);

server.use('/api', setJsonHeaders, router);

server.use(unknownEndpoint);

const httpPort = 3001;
server.listen(httpPort, () => {
  console.log(`Server is running at http://localhost:${httpPort}`);
});

// createServer(options, server).listen(httpsPort, () => {
//   console.log(`Server is running at https://localhost:${httpsPort}`);
// });
