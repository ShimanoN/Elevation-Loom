/**
 * Tests for Result type system
 */

import { describe, it, expect } from 'vitest';
import {
  Ok,
  Err,
  isOk,
  isErr,
  mapResult,
  chainResult,
  unwrap,
  unwrapOr,
} from '../js/result';

describe('Result type', () => {
  describe('Ok', () => {
    it('creates a successful result', () => {
      const result = Ok(42);
      expect(result.ok).toBe(true);
      expect(result.value).toBe(42);
    });

    it('works with different value types', () => {
      const stringResult = Ok('success');
      expect(stringResult.ok).toBe(true);
      expect(stringResult.value).toBe('success');

      const objectResult = Ok({ data: 'test' });
      expect(objectResult.ok).toBe(true);
      expect(objectResult.value).toEqual({ data: 'test' });
    });
  });

  describe('Err', () => {
    it('creates an error result', () => {
      const result = Err(new Error('test error'));
      expect(result.ok).toBe(false);
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error.message).toBe('test error');
    });

    it('works with different error types', () => {
      const stringError = Err('error message');
      expect(stringError.ok).toBe(false);
      expect(stringError.error).toBe('error message');
    });
  });

  describe('isOk', () => {
    it('returns true for Ok results', () => {
      const result = Ok(42);
      expect(isOk(result)).toBe(true);
    });

    it('returns false for Err results', () => {
      const result = Err(new Error('test'));
      expect(isOk(result)).toBe(false);
    });

    it('narrows type correctly', () => {
      const result = Ok(42);
      if (isOk(result)) {
        // TypeScript should know result.value exists here
        expect(result.value).toBe(42);
      }
    });
  });

  describe('isErr', () => {
    it('returns false for Ok results', () => {
      const result = Ok(42);
      expect(isErr(result)).toBe(false);
    });

    it('returns true for Err results', () => {
      const result = Err(new Error('test'));
      expect(isErr(result)).toBe(true);
    });

    it('narrows type correctly', () => {
      const result = Err(new Error('test'));
      if (isErr(result)) {
        // TypeScript should know result.error exists here
        expect(result.error.message).toBe('test');
      }
    });
  });

  describe('mapResult', () => {
    it('transforms Ok value', () => {
      const result = Ok(42);
      const mapped = mapResult(result, (x) => x * 2);
      expect(isOk(mapped)).toBe(true);
      if (isOk(mapped)) {
        expect(mapped.value).toBe(84);
      }
    });

    it('leaves Err unchanged', () => {
      const result = Err(new Error('test'));
      const mapped = mapResult(result, (x) => x * 2);
      expect(isErr(mapped)).toBe(true);
      if (isErr(mapped)) {
        expect(mapped.error.message).toBe('test');
      }
    });

    it('can change value type', () => {
      const result = Ok(42);
      const mapped = mapResult(result, (x) => `number: ${x}`);
      expect(isOk(mapped)).toBe(true);
      if (isOk(mapped)) {
        expect(mapped.value).toBe('number: 42');
      }
    });
  });

  describe('chainResult', () => {
    it('chains Ok results', () => {
      const result = Ok(42);
      const chained = chainResult(result, (x) => Ok(x * 2));
      expect(isOk(chained)).toBe(true);
      if (isOk(chained)) {
        expect(chained.value).toBe(84);
      }
    });

    it('short-circuits on Err', () => {
      const result = Err(new Error('first error'));
      const chained = chainResult(result, (x) => Ok(x * 2));
      expect(isErr(chained)).toBe(true);
      if (isErr(chained)) {
        expect(chained.error.message).toBe('first error');
      }
    });

    it('propagates Err from chained function', () => {
      const result = Ok(42);
      const chained = chainResult(result, () => Err(new Error('chain error')));
      expect(isErr(chained)).toBe(true);
      if (isErr(chained)) {
        expect(chained.error.message).toBe('chain error');
      }
    });

    it('can change value type', () => {
      const result = Ok(42);
      const chained = chainResult(result, (x) => Ok(`number: ${x}`));
      expect(isOk(chained)).toBe(true);
      if (isOk(chained)) {
        expect(chained.value).toBe('number: 42');
      }
    });
  });

  describe('unwrap', () => {
    it('returns value for Ok', () => {
      const result = Ok(42);
      expect(unwrap(result)).toBe(42);
    });

    it('throws for Err', () => {
      const result = Err(new Error('test error'));
      expect(() => unwrap(result)).toThrow('test error');
    });
  });

  describe('unwrapOr', () => {
    it('returns value for Ok', () => {
      const result = Ok(42);
      expect(unwrapOr(result, 0)).toBe(42);
    });

    it('returns default for Err', () => {
      const result = Err(new Error('test error'));
      expect(unwrapOr(result, 0)).toBe(0);
    });

    it('works with different types', () => {
      const stringResult = Err(new Error('test'));
      expect(unwrapOr(stringResult, 'default')).toBe('default');

      const objectResult = Ok({ data: 'test' });
      expect(unwrapOr(objectResult, { data: 'default' })).toEqual({
        data: 'test',
      });
    });
  });

  describe('chaining multiple operations', () => {
    it('chains multiple successful operations', () => {
      const step1 = mapResult(Ok(10), (x) => x * 2);
      const step2 = chainResult(step1, (x) => Ok(x + 5));
      const result = mapResult(step2, (x) => x.toString());

      expect(isOk(result)).toBe(true);
      if (isOk(result)) {
        expect(result.value).toBe('25');
      }
    });

    it('short-circuits on first error', () => {
      const result = Ok(10);
      const step1 = mapResult(result, (x) => x * 2);
      const step2 = chainResult(step1, () => Err(new Error('stopped here')));
      const step3 = mapResult(step2, (x) => x + 5);

      expect(isErr(step3)).toBe(true);
      if (isErr(step3)) {
        expect(step3.error.message).toBe('stopped here');
      }
    });
  });
});
