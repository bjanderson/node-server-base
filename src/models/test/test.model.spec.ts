import { DEFAULT_STRING } from '@bj.anderson/utils';
import { Test } from './test.model';

describe('Test', () => {
  describe('constructor defaults', () => {
    const defaults = {
      pk: DEFAULT_STRING,
      value: DEFAULT_STRING,
    };

    it('should have the expected fields', () => {
      expect(Object.keys(defaults)).toEqual(Object.keys(new Test()));
    });

    it('should set the default values when given no input object', () => {
      expect(Object.values(defaults)).toEqual(Object.values(new Test()));
    });

    it('should set the default values when given null', () => {
      expect(Object.values(defaults)).toEqual(Object.values(new Test(null)));
    });

    it('should set the default values when given an empty object', () => {
      expect(Object.values(defaults)).toEqual(Object.values(new Test({})));
    });
  });

  describe('constructor assignments', () => {
    it('should set all values passed into the constructor', () => {
      const test = {
        pk: 'test-pk',
        value: 'test value',
      };

      expect(Object.values(test)).toEqual(Object.values(new Test(test)));
    });
  });
});
