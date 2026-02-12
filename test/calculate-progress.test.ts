import { describe, it, expect } from 'vitest';

describe('calculateWeekProgress', () => {
  it('target が null のとき diff/percentage は null', () => {
    const res = calculateWeekProgress(1000, null);
    expect(res.diff).toBeNull();
    expect(res.percentage).toBeNull();
  });

  it('target が 0 のとき percentage は 100', () => {
    const res = calculateWeekProgress(500, 0);
    expect(res.diff).toBe(500);
    expect(res.percentage).toBe(100);
  });

  it('current > target のとき正しい diff と percentage', () => {
    const res = calculateWeekProgress(1500, 1000);
    expect(res.diff).toBe(500);
    expect(res.percentage).toBe(150);
  });

  it('current < target のとき負の diff と小さい percentage', () => {
    const res = calculateWeekProgress(500, 1000);
    expect(res.diff).toBe(-500);
    expect(res.percentage).toBe(50);
  });
});
