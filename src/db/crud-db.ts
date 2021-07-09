import { Database } from 'sqlite3';
import { v4 as uuid } from 'uuid';
import { IHasPK } from '../models';

export abstract class CrudDb<T extends IHasPK> {
  get tableColumns(): string[] {
    return this.tableColumnDefinitions.map(d => d.split(' ')[0])
  }

  get columnNames(): string {
    return this.tableColumns.join(', ');
  }

  constructor(private database: string, private tableName: string, private tableColumnDefinitions: string[]) {
    this.initDB()
  }

  connect(): Database {
    return new Database(this.database)
  }

  close(db: Database): void {
    db.close()
  }

  initDB(): void {
    this.createTable()
  }


  createTable(): void {
    const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${this.tableColumnDefinitions.join(', ')});`
    const db = this.connect()
    db.run(sql)
    this.close(db)
  }


  get(pk: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const db = this.connect()
      const sql = `SELECT ${this.columnNames} FROM ${this.tableName} WHERE pk = ${pk}`;
      db.get(sql, [], (err: Error, result: T) => {
        console.log('\n-----');
        console.log('CrudDB.get');
        console.log('result :>> ', result);
        console.log('err :>> ', err);
        if (err == null) {
          console.log('result :>> ', result);
          resolve(result)
        } else {
          reject(err)
        }
      })
      this.close(db);
    });
  }

  getAll(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const db = this.connect();
      const sql = `SELECT ${this.columnNames} FROM ${this.tableName}`;
      db.all(sql, [], (err: Error, rows: T[]) => {
        console.log('\n-----');
        console.log('CrudDB.getAll');
        console.log('rows :>> ', rows);
        console.log('err :>> ', err);
        if (err == null) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
      this.close(db);
    });
  }

  create(item: T): Promise<any> {
    item.pk = uuid();
    const values = this.getItemValues(item)
    const sql = `INSERT INTO ${this.tableName} (${this.columnNames}) VALUES (${values.map(_ => '?').join(',')});`
    console.log('CrudDB.create - sql :>> ', sql);

    return new Promise((resolve, reject) => {
      const db = this.connect()
      db.run(sql, values, (result, err) => {
        console.log('\n-----');
        console.log('CrudDB.create');
        console.log('result :>> ', result);
        console.log('err :>> ', err);
        if (err == null) {
          resolve(item)
        } else {
          reject(err)
        }
      })
      this.close(db);
    });
  }

  getItemValues(item: T): any[] {
    const values = []
    this.tableColumns.forEach(col => {
      try {
        values.push(item[col])
      } catch (err) {
        values.push(null)
      }
    })

    return values
  }

  update(item: T): Promise<T> {
    const values = this.getItemValues(item)
    const sql = `UPDATE ${this.tableName} SET ${this.tableColumns.map(col => col + '=?').join(',')} WHERE pk = "${item.pk}"`
    console.log('CrudDB.update - sql :>> ', sql);

    return new Promise((resolve, reject) => {
      const db = this.connect()
      db.run(sql, values, (result, err) => {
        console.log('\n-----');
        console.log('CrudDB.update');
        console.log('result :>> ', result);
        console.log('err :>> ', err);
        if (err == null) {
          resolve(item)
        } else {
          reject(err)
        }
      })
      this.close(db);
    });
  }

  delete(pk: string): Promise<string> {
    const sql = `DELETE FROM ${this.tableName} WHERE pk = ?`
    console.log('CrudDB.delete - sql :>> ', sql);
    return new Promise((resolve, reject) => {
      const db = this.connect()
      db.run(sql, [pk], (result, err) => {
        console.log('\n-----');
        console.log('CrudDB.delete');
        console.log('result :>> ', result);
        console.log('err :>> ', err);
        if (err == null) {
          resolve(pk)
        } else {
          reject(err)
        }
      })
      this.close(db);
    });
  }
}
