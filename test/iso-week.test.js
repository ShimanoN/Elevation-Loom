import { describe, it, expect } from 'vitest';

describe('getISOWeekInfo', () => {
  it('2026-02-09（月）は2026-W07', () => {
    const date = new Date(2026, 1, 9);
    const result = getISOWeekInfo(date);

    expect(result.iso_year).toBe(2026);
    expect(result.week_number).toBe(7);
    expect(result.start_date).toBe('2026-02-09');
    expect(result.end_date).toBe('2026-02-15');
  });

  it('年またぎ: 2025-12-29（月）は2026-W01', () => {
    const date = new Date(2025, 11, 29);
    const result = getISOWeekInfo(date);

    expect(result.iso_year).toBe(2026);
    expect(result.week_number).toBe(1);
  });

  it('年またぎ: 2026-01-01（木）は2026-W01', () => {
    const date = new Date(2026, 0, 1);
    const result = getISOWeekInfo(date);

    expect(result.iso_year).toBe(2026);
    expect(result.week_number).toBe(1);
  });
});
