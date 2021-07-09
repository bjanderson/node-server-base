import { getObject, getString } from '@bj.anderson/utils';
import { IHasPK } from '../ihaspk';

export class Test implements IHasPK {
  pk: string;
  value: string;

  constructor(o?: Partial<Test>) {
    const obj: Partial<Test> = getObject(o);
    this.pk = getString(obj.pk, null);
    this.value = getString(obj.value);
  }
}
