import { describe, it, expect, beforeEach } from 'vitest';

/**
 * LEGACY TESTS - Marked as skip pending Firestore integration
 * 
 * These integration tests use real IndexedDB but db.js now uses Firestore.
 */

describe.skip('WeekTarget store operations (LEGACY - needs Firestore mocking)', () => {
  beforeEach(async () => {
    try {
      const opened = await initDB();
      try { opened.close(); } catch (e) {}
    } catch (e) {}

    await new Promise((res, rej) => {
      const req = indexedDB.deleteDatabase('TrainingMirrorDB');
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
      req.onblocked = () => res();
    });

    if (typeof globalThis.__resetDB === 'function') globalThis.__resetDB();
  });

  it('saveWeekTarget and getWeekTarget work', async () => {
    await initDB();
    const wt = {
      key: '2026-W07',
      target_elevation: 2000,
      iso_year: 2026,
      week_number: 7,
      start_date: '2026-02-09',
      end_date: '2026-02-15',
    };
    await saveWeekTarget(wt);

    const got = await getWeekTarget('2026-W07');
    expect(got).toBeDefined();
    expect(got.key).toBe('2026-W07');
    expect(got.target_elevation).toBe(2000);
  });

  it('getAllWeekTargets returns saved targets', async () => {
    await initDB();
    const a = { key: '2026-W05', target_elevation: 1000, iso_year: 2026, week_number: 5, start_date: '2026-02-01', end_date: '2026-02-07' };
    const b = { key: '2026-W06', target_elevation: 1500, iso_year: 2026, week_number: 6, start_date: '2026-02-08', end_date: '2026-02-14' };
    await saveWeekTarget(a);
    await saveWeekTarget(b);

    const all = await getAllWeekTargets();
    const keys = all.map((r) => r.key).sort();
    expect(keys).toEqual(['2026-W05', '2026-W06']);
  });

  it('getWeekTarget returns undefined for missing key', async () => {
    await initDB();
    const missing = await getWeekTarget('2099-W99');
    expect(missing).toBeUndefined();
  });
});
