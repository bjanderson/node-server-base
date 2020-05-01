export const setJsonHeaders = (req, res, next): void => {
  try {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      req.headers.Accept = 'application/json';
      req.headers['Content-Type'] = 'application/json';
    }
  } catch (err) {
    console.log('setJsonHeaders - error: ', err);
  }
  next();
};
