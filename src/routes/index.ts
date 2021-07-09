import express, { Response, Request } from 'express';
import { testRoutes } from './test-routes';
import { errorRoutes } from './error-routes';

export const router = express.Router({ mergeParams: true });

router.use('/test', testRoutes.router);
router.use('/error', errorRoutes.router);

router.get('/', (request: Request, response: Response): void => {
  response.send('Server Base API\n');
});
