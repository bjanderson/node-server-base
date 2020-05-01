import { Test } from '../models';
import { CrudRoutes } from './crud-routes';
import { testDb } from '../db';

class TestRoutes extends CrudRoutes<Test> {
  constructor() {
    super(testDb);
  }
}

export const testRoutes = new TestRoutes();
