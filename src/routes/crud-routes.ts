import { Request, Response, Router } from 'express';
import { CrudDb } from '../db';

export abstract class CrudRoutes<T> {
  public router: Router;

  constructor(private db: CrudDb<T>) {
    this.router = Router({ mergeParams: true });
    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  getAll(req: Request, res: Response): void {
    const items = this.db.getAll();
    res.json(items);
  }

  getById(req: Request, res: Response): void {
    const { id } = req.params;
    const item = this.db.get(id);
    res.json(item);
  }

  create(req: Request, res: Response): void {
    const item = this.db.create(req.body);
    res.json(item);
  }

  update(req: Request, res: Response): void {
    const item = this.db.update(req.body);
    res.json(item);
  }

  remove(req: Request, res: Response): void {
    const { id } = req.params;
    const deleted = this.db.delete(id);
    res.json({ deleted });
  }
}
