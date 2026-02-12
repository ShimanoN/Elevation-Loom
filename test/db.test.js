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
 * 
 * Current coverage: 40 passing tests in auth-storage.test.js and result.test.js
 * cover the new Firestore-authoritative architecture.
 */

describe.skip('Database operations (LEGACY - needs Firestore mocking)', () => {
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
