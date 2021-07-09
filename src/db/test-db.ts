import { CrudDb } from './crud-db';
import { Test } from '../models';
import { testDB } from '../constants';

const database = testDB;

const tableName = 'test';

const tableColumnDefinitions = [
  'pk TEXT NOT NULL PRIMARY KEY',
  'value TEXT'
];

class TestDb extends CrudDb<Test> {
  constructor() {
    super(database, tableName, tableColumnDefinitions);
  }
}

export const testDb = new TestDb();

// testDb.create(new Test({value: 'test-1'})).then((result) => {
//   console.log('testDb.create - result :>> ', result);
//   testDb.getAll().then(console.log).catch(console.error)
// }).catch(console.error)

// testDb.update(new Test({pk: '4a19e823-ed11-4965-810b-617f153d6044', value: 'test-2'})).then((result) => {
//   console.log('testDb.update - result :>> ', result);
//   testDb.getAll().then(console.log).catch(console.error)
// }).catch(console.error)

// testDb.delete('1c88da09-692f-4833-beba-17f85808a6a6').then((result) => {
//   console.log('testDb.delete - result :>> ', result);
//   testDb.getAll().then(console.log).catch(console.error)
// }).catch(console.error)
