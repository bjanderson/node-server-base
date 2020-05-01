import { getObject, getString } from '@bj.anderson/utils';

export class Test {
  id: string;
  value: string;

  constructor(o?: Partial<Test>) {
    const obj: Partial<Test> = getObject(o);
    this.id = getString(obj.id);
    this.value = getString(obj.value);
  }
}
