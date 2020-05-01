import path from 'path';
import { CrudDb } from './crud-db';
import { Test } from '../models';

const fileName = path.resolve('data', 'test.json');
const key = 'test';

class TestDb extends CrudDb<Test> {
  constructor() {
    super(fileName, key);
  }
}

export const testDb = new TestDb();
