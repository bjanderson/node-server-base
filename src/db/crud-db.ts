import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { v4 as uuid } from 'uuid';
import { existsSync, writeFileSync } from 'fs-extra';

interface IHasId {
  id: string;
}

export abstract class CrudDb<T> {
  private adapter: FileSync;
  private db: lowdb;

  constructor(fileName: string, key: string) {
    this.createFile(fileName);
    this.adapter = new FileSync(fileName);
    this.db = lowdb(this.adapter)
      .defaults({ [key]: [] })
      .get(key);
  }

  get(id: string): T {
    return this.db.find({ id }).value();
  }

  getAll(): T[] {
    return this.db.value();
  }

  create(item: T): T {
    const i = Object.assign(item, { id: uuid() });
    this.db.push(i).write();
    return this.get(i.id);
  }

  update(item: IHasId): T {
    this.db.find({ id: item.id }).assign(item).write();
    return this.get(item.id);
  }

  delete(id: string): string {
    this.db.remove({ id }).write();
    return this.get(id) == null ? id : null;
  }

  createFile(fileName: string): void {
    if (!existsSync(fileName)) {
      writeFileSync(fileName, '', { encoding: 'utf-8' });
    }
  }
}
