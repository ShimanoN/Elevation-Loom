import { describe, it, expect, beforeEach } from 'vitest';

describe('calculateWeekTotal', () => {
  beforeEach(() => {
    // Ensure default getDayLogsByWeek exists; tests will override as needed
    global.getDayLogsByWeek = async () => [];
  });

  it('無効な年は0を返す', async () => {
    const result = await calculateWeekTotal(1999, 1);
    expect(result).toBe(0);
  });

  it('単一データの合計', async () => {
    global.getDayLogsByWeek = async () => [{ elevation_total: 1500 }];
    const result = await calculateWeekTotal(2026, 7);
    expect(result).toBe(1500);
  });

  it('複数データの合計', async () => {
    global.getDayLogsByWeek = async () => [
      { elevation_total: 1000 },
      { elevation_total: 1500 },
      { elevation_total: 800 },
    ];
    const result = await calculateWeekTotal(2026, 7);
    expect(result).toBe(3300);
  });
});
