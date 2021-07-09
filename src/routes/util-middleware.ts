import { Request, Response, NextFunction } from 'express';

export const setJsonHeaders = (request: Request, response: Response, next: NextFunction): void => {
  try {
    if (['PATCH', 'POST', 'PUT'].includes(request.method)) {
      request.headers.Accept = 'application/json';
      request.headers['Content-Type'] = 'application/json';
    }
  } catch (err) {
    console.log('setJsonHeaders - error: ', err);
  }
  next();
};

export const requestLogger = (request: Request, response: Response, next: NextFunction): void => {
  console.log('------------------------------');
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  next();
};

export const unknownEndpoint = (request: Request, response: Response): void => {
  response.status(404).send({ error: 'unknown endpoint' });
};
