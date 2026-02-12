import { describe, it, expect, beforeEach } from 'vitest';

/**
 * LEGACY TESTS - Marked as skip pending Firestore integration
 *
 * These tests were written for the old IndexedDB-direct architecture.
 * The db.js module has been refactored to use Firestore via storage.ts.
 *
 * To re-enable these tests:
 * 1. Mock Firebase Auth (ensureAuthenticated)
 * 2. Mock Firestore operations (getDoc, setDoc, runTransaction)
 * 3. Test through storage.ts layer, not IndexedDB directly
 */

describe.skip('DB additional operations (LEGACY - needs Firestore mocking)', () => {
  beforeEach(async () => {
    // close any open DB then delete to avoid onblocked
    try {
      const opened = await initDB();
      try {
        opened.close();
      } catch (e) {}
    } catch (e) {
      // ignore if not open
    }

    await new Promise((res, rej) => {
      const req = indexedDB.deleteDatabase('TrainingMirrorDB');
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
      req.onblocked = () => res();
    });

    // clear module-internal reference to closed DB
    if (typeof globalThis.__resetDB === 'function') globalThis.__resetDB();
  });

  it('getAllDayLogs は保存された全件を返す', async () => {
    await initDB();
    const a = {
      date: '2026-02-01',
      elevation_total: 100,
      iso_year: 2026,
      week_number: 5,
    };
    const b = {
      date: '2026-02-02',
      elevation_total: 200,
      iso_year: 2026,
      week_number: 5,
    };
    await saveDayLog(a);
    await saveDayLog(b);

    const all = await getAllDayLogs();
    // order not guaranteed; check by dates
    const dates = all.map((r) => r.date).sort();
    expect(dates).toEqual(['2026-02-01', '2026-02-02']);
  });

  it('getDayLogsByWeek は該当週のみを返す', async () => {
    await initDB();
    const a = {
      date: '2026-02-01',
      elevation_total: 100,
      iso_year: 2026,
      week_number: 5,
    };
    const b = {
      date: '2026-02-08',
      elevation_total: 200,
      iso_year: 2026,
      week_number: 6,
    };
    await saveDayLog(a);
    await saveDayLog(b);

    const week5 = await getDayLogsByWeek(2026, 5);
    expect(week5.length).toBe(1);
    expect(week5[0].date).toBe('2026-02-01');
  });

  it('deleteDayLog はデータを削除する', async () => {
    await initDB();
    const item = {
      date: '2026-02-03',
      elevation_total: 123,
      iso_year: 2026,
      week_number: 5,
    };
    await saveDayLog(item);
    let got = await getDayLog('2026-02-03');
    expect(got).toBeDefined();

    await deleteDayLog('2026-02-03');
    got = await getDayLog('2026-02-03');
    expect(got).toBeUndefined();
  });
});
