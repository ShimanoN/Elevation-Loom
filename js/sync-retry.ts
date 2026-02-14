/**
 * Sync retry mechanism for offline/failed Firestore operations
 * Automatically retries saving data to Firestore when network connection is restored
 */

import { loadWeekData, saveWeekData } from './storage.js';
import type { WeekData } from './types.js';
import { isAuthReady, waitForAuth } from './firebase-config.js';

// ============================================================
// Constants and Types
// ============================================================

const PENDING_SYNC_KEY = 'elv_pending_sync';
const SYNC_CHECK_INTERVAL = 30000; // Check every 30 seconds

interface PendingSyncItem {
  weekKey: string;
  isoYear: number;
  isoWeek: number;
  lastAttempt: number;
  retryCount: number;
}

interface PendingSyncQueue {
  items: PendingSyncItem[];
  lastUpdated: number;
}

// ============================================================
// Module State
// ============================================================

let syncTimer: number | null = null;
let syncing = false;

// ============================================================
// Queue Management
// ============================================================

/**
 * Get pending sync queue from LocalStorage
 */
function getPendingQueue(): PendingSyncQueue {
  try {
    const data = localStorage.getItem(PENDING_SYNC_KEY);
    if (!data) {
      return { items: [], lastUpdated: Date.now() };
    }
    return JSON.parse(data);
  } catch (error) {
    console.warn('Failed to read pending sync queue:', error);
    return { items: [], lastUpdated: Date.now() };
  }
}

/**
 * Save pending sync queue to LocalStorage
 */
function savePendingQueue(queue: PendingSyncQueue): void {
  try {
    queue.lastUpdated = Date.now();
    localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to save pending sync queue:', error);
  }
}

/**
 * Add item to pending sync queue
 * @param isoYear - ISO year
 * @param isoWeek - ISO week number
 */
export function addToPendingSync(isoYear: number, isoWeek: number): void {
  const weekKey = `${isoYear}-W${String(isoWeek).padStart(2, '0')}`;
  const queue = getPendingQueue();

  // Check if already in queue
  const existingIndex = queue.items.findIndex(
    (item) => item.isoYear === isoYear && item.isoWeek === isoWeek
  );

  if (existingIndex >= 0) {
    // Update existing entry
    queue.items[existingIndex].lastAttempt = Date.now();
    queue.items[existingIndex].retryCount += 1;
  } else {
    // Add new entry
    queue.items.push({
      weekKey,
      isoYear,
      isoWeek,
      lastAttempt: Date.now(),
      retryCount: 0,
    });
  }

  savePendingQueue(queue);
  console.log(`Added to pending sync queue: ${weekKey}`);

  // Start sync timer if not already running
  if (!syncTimer) {
    startSyncTimer();
  }
}

/**
 * Remove item from pending sync queue
 * @param isoYear - ISO year
 * @param isoWeek - ISO week number
 */
function removeFromPendingSync(isoYear: number, isoWeek: number): void {
  const queue = getPendingQueue();
  queue.items = queue.items.filter(
    (item) => !(item.isoYear === isoYear && item.isoWeek === isoWeek)
  );
  savePendingQueue(queue);
}

/**
 * Clear all pending sync items
 */
export function clearPendingSync(): void {
  try {
    localStorage.removeItem(PENDING_SYNC_KEY);
    console.log('Cleared pending sync queue');
  } catch (error) {
    console.error('Failed to clear pending sync queue:', error);
  }
}

// ============================================================
// Sync Operations
// ============================================================

/**
 * Attempt to sync a single week's data to Firestore
 * @param item - Pending sync item
 * @returns true if sync successful, false otherwise
 */
async function syncWeekData(item: PendingSyncItem): Promise<boolean> {
  try {
    // Load week data from cache/LocalStorage
    const result = await loadWeekData(item.isoYear, item.isoWeek);

    if (!result.ok) {
      console.error(`Failed to load week data for sync: ${item.weekKey}`);
      return false;
    }

    const weekData = result.value;

    // Skip if data is empty (no actual user data)
    if (
      weekData.target.value === 0 &&
      weekData.dailyLogs.length === 0 &&
      weekData.createdAt.getTime() === 0
    ) {
      console.log(`Skipping empty week data: ${item.weekKey}`);
      return true; // Consider this success (nothing to sync)
    }

    // Prepare data without metadata for saving
    const dataToSave: Omit<WeekData, 'createdAt' | 'updatedAt'> = {
      isoYear: weekData.isoYear,
      isoWeek: weekData.isoWeek,
      target: weekData.target,
      dailyLogs: weekData.dailyLogs,
    };

    // Try to save to Firestore
    const saveResult = await saveWeekData(dataToSave);

    if (saveResult.ok) {
      console.log(`Successfully synced to Firestore: ${item.weekKey}`);
      return true;
    } else {
      console.warn(
        `Sync attempt failed for ${item.weekKey}:`,
        saveResult.error
      );
      return false;
    }
  } catch (error) {
    console.error(`Error syncing week data ${item.weekKey}:`, error);
    return false;
  }
}

/**
 * Process pending sync queue
 * Attempts to sync all pending items
 */
async function processPendingSync(): Promise<void> {
  if (syncing) {
    console.log('Sync already in progress, skipping');
    return;
  }

  // Check if online
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.log('Offline, skipping sync attempt');
    return;
  }

  // Check if auth is ready
  if (!isAuthReady()) {
    console.log('Auth not ready, waiting...');
    try {
      await waitForAuth(5000); // 5 second timeout
    } catch (_error) {
      console.warn('Auth wait timeout during sync, skipping');
      return;
    }
  }

  syncing = true;
  const queue = getPendingQueue();

  if (queue.items.length === 0) {
    syncing = false;
    return;
  }

  console.log(`Processing ${queue.items.length} pending sync items...`);

  const itemsToSync = [...queue.items];
  let successCount = 0;

  for (const item of itemsToSync) {
    const success = await syncWeekData(item);
    if (success) {
      removeFromPendingSync(item.isoYear, item.isoWeek);
      successCount++;
    }
  }

  console.log(
    `Sync complete: ${successCount}/${itemsToSync.length} successful`
  );

  // If all items synced successfully, stop timer
  const updatedQueue = getPendingQueue();
  if (updatedQueue.items.length === 0 && syncTimer) {
    stopSyncTimer();
  }

  syncing = false;

  // Dispatch sync complete event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('sync:complete', {
        detail: { successCount, totalCount: itemsToSync.length },
      })
    );
  }
}

/**
 * Start periodic sync timer
 */
function startSyncTimer(): void {
  if (syncTimer) {
    return; // Already running
  }

  console.log('Starting sync timer');
  syncTimer = window.setInterval(() => {
    processPendingSync().catch((error) => {
      console.error('Sync error:', error);
    });
  }, SYNC_CHECK_INTERVAL);

  // Immediate first sync
  processPendingSync().catch((error) => {
    console.error('Initial sync error:', error);
  });
}

/**
 * Stop periodic sync timer
 */
function stopSyncTimer(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log('Sync timer stopped');
  }
}

// ============================================================
// Public API
// ============================================================

/**
 * Manually trigger sync attempt
 * @returns Promise resolving to sync result
 */
export async function triggerManualSync(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await processPendingSync();
    const queue = getPendingQueue();

    if (queue.items.length === 0) {
      return {
        success: true,
        message:
          'すべてのデータが同期されました。\nAll data synced successfully.',
      };
    } else {
      return {
        success: false,
        message: `${queue.items.length} 件のデータが同期待ちです。\n${queue.items.length} items still pending sync.`,
      };
    }
  } catch (error) {
    console.error('Manual sync error:', error);
    return {
      success: false,
      message:
        '同期に失敗しました。ネットワーク接続を確認してください。\nSync failed. Please check network connection.',
    };
  }
}

/**
 * Get count of pending sync items
 * @returns Number of items waiting to be synced
 */
export function getPendingSyncCount(): number {
  const queue = getPendingQueue();
  return queue.items.length;
}

/**
 * Initialize sync retry system
 * Should be called on app startup
 */
export function initSyncRetry(): void {
  // Check if there are pending items and start timer if needed
  const queue = getPendingQueue();
  if (queue.items.length > 0) {
    console.log(
      `Found ${queue.items.length} pending sync items, starting timer`
    );
    startSyncTimer();
  }

  // Listen for online event
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('Network online, triggering sync');
      processPendingSync().catch((error) => {
        console.error('Sync on online event error:', error);
      });
    });
  }
}

// ============================================================
// Export window API for debugging
// ============================================================

if (typeof window !== 'undefined') {
  interface WindowWithSyncAPI extends Window {
    elvSync?: {
      trigger: typeof triggerManualSync;
      getPendingCount: typeof getPendingSyncCount;
      clear: typeof clearPendingSync;
    };
  }
  (window as WindowWithSyncAPI).elvSync = {
    trigger: triggerManualSync,
    getPendingCount: getPendingSyncCount,
    clear: clearPendingSync,
  };
}
