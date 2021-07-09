import { Request, Response, Router } from 'express';
import { CrudDb } from '../db';
import { IHasPK } from '../models';

export abstract class CrudRoutes<T extends IHasPK> {
  public router: Router;

  constructor(private db: CrudDb<T>) {
    this.router = Router({ mergeParams: true });
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  getAll(request: Request, response: Response): void {
    const items = this.db.getAll();
    response.json(items);
  }

  getById(request: Request, response: Response): void {
    const { id } = request.params;
    const item = this.db.get(id);
    if (item != null) {
      response.json(item);
    } else {
      response.status(404).end();
    }
  }

  create(request: Request, response: Response): void {
    if (request.body == null) {
      response.status(400).json({ error: 'The request body must be defined' });
    } else {
      this.db.create(request.body).catch((err) => {
        response.status(500).json(err);
      }).then((item) => {
        response.json(item);
      });
    }
  }

  update(request: Request, response: Response): void {
    if (request.body == null) {
      response.status(400).json({ error: 'The request body must be defined' });
    } else {
      const item = this.db.update(request.body);
      response.json(item);
    }
  }

  remove(request: Request, response: Response): void {
    const { id } = request.params;
    if (request.body == null) {
      response.status(400).json({ error: 'The id must be defined' });
    } else {
      const deleted = this.db.delete(id);
      response.json({ deleted });
    }
  }
}
