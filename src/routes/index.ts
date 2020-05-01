import express from 'express';
import { testRoutes } from './test-routes';

export const router = express.Router({ mergeParams: true });

router.use('/test', testRoutes.router);

router.get('/', (req, res): void => {
  res.send('Server Base API\n');
});
