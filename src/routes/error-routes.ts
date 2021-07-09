import { Request, Response, Router } from 'express';

export class ErrorRoutes {
  public router: Router;

  private errorMessages = {
    400: '400 Bad Request',
    404: '404 Not Found',
    500: '500 Server Error'
  };

  constructor() {
    this.router = Router({ mergeParams: true });
    const statuses = Object.keys(this.errorMessages);
    statuses.forEach(status => {
      this.createRestErrorRoutes(status)
    })
  }

  createRestErrorRoutes(status: string): void {
    this.router.get(`/${status}`, this.returnResponse.bind(this));
    this.router.post(`/${status}`, this.returnResponse.bind(this));
    this.router.put(`/${status}`, this.returnResponse.bind(this));
    this.router.delete(`/${status}`, this.returnResponse.bind(this));
  }

  returnResponse(request: Request, response: Response): void {
    const urlParts = request.url.split('/');
    console.log('urlParts :>> ', urlParts);
    const status = parseInt(urlParts.slice(-1)[0], 10);
    console.log('status :>> ', status);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    response.status(status).json({ error: this.errorMessages[`${status}`] });
  }
}

export const errorRoutes = new ErrorRoutes();
