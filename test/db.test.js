import { describe, it, expect, beforeEach } from 'vitest';

describe('Database operations', () => {
  beforeEach(async () => {
    // delete DB to start fresh each test
    await new Promise((res, rej) => {
      const req = indexedDB.deleteDatabase('TrainingMirrorDB');
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
      req.onblocked = () => res();
    });
  });

  it('データの保存と取得', async () => {
    const testData = {
      date: '2026-02-09',
      elevation_part1: 800,
      elevation_part2: 700,
      elevation_total: 1500,
      subjective_condition: 'good',
      iso_year: 2026,
      week_number: 7,
    };

    await initDB();
    await saveDayLog(testData);

    const retrieved = await getDayLog('2026-02-09');

    expect(retrieved.date).toBe('2026-02-09');
    expect(retrieved.elevation_total).toBe(1500);
    expect(retrieved.subjective_condition).toBe('good');
  });

  it('存在しないデータの取得はundefined', async () => {
    await initDB();
    const result = await getDayLog('2099-12-31');
    expect(result).toBeUndefined();
  });
});
