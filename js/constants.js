/**
 * Global constants for Elevation Loom application
 * This file contains all magic numbers and configuration values
 * used throughout the application.
 */

// ============================================================
// Day Names and Labels
// ============================================================

/**
 * Japanese day names (starting from Sunday)
 */
const DAY_NAMES_JP = ['日', '月', '火', '水', '木', '金', '土'];

/**
 * English day names (starting from Sunday)
 */
const DAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Japanese day names for chart labels (Monday to Sunday)
 */
const DAY_LABELS_CHART = ['月', '火', '水', '木', '金', '土', '日'];

/**
 * Mapping from Japanese to English day names
 */
const DAY_NAME_JP_TO_EN = {
  日: 'Sun',
  月: 'Mon',
  火: 'Tue',
  水: 'Wed',
  木: 'Thu',
  金: 'Fri',
  土: 'Sat',
};

// ============================================================
// Time Constants
// ============================================================

/**
 * Milliseconds per week (7 days)
 */
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Milliseconds per day
 */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Maximum days of history to keep or display
 */
const MAX_DAYS_HISTORY = 30;

// ============================================================
// Chart Configuration
// ============================================================

/**
 * Chart padding configuration
 */
const CHART_PADDING = {
  top: 48,
  right: 64,
  bottom: 56,
  left: 64,
};

/**
 * Chart bar width configuration
 */
const CHART_BAR_WIDTH_RATIO = 0.32;

/**
 * Y-axis scale configuration
 */
const Y_AXIS_CONFIG = {
  dailyScaleFactor: 1.2,
  dailyMinValue: 200,
  dailyRoundTo: 100,
  cumulativeScaleFactor: 1.1,
  cumulativeMinValue: 1000,
  cumulativeRoundTo: 200,
};

/**
 * Grid configuration
 */
const CHART_GRID_LINES = 4;

// ============================================================
// Input Validation Ranges
// ============================================================

/**
 * Elevation input validation ranges
 */
const ELEVATION_INPUT = {
  min: 0,
  max: 10000,
  step: 100,
};

/**
 * Weekly target validation ranges
 */
const WEEKLY_TARGET_INPUT = {
  min: 0,
  max: 10000,
  step: 100,
};

// ============================================================
// Backup Configuration
// ============================================================

/**
 * Backup system configuration
 * Note: These values are already well-defined in backup.js
 */
const BACKUP_CONFIG = {
  prefix: 'elv_backup_',
  metaKey: 'elv_backup_meta',
  maxBackups: 10,
  autoIntervalMs: 24 * 60 * 60 * 1000,
  debounceMs: 2000,
};

// ============================================================
// ISO Week Configuration
// ============================================================

/**
 * Valid ISO year range (aligned with test expectations)
 */
const ISO_YEAR_RANGE = {
  min: 2000,
  max: 2100,
};

/**
 * Valid ISO week number range
 */
const ISO_WEEK_RANGE = {
  min: 1,
  max: 53,
};

// ============================================================
// Exports
// ============================================================

// Export to global scope for use in non-module scripts
if (typeof globalThis !== 'undefined') {
  globalThis.DAY_NAMES_JP = DAY_NAMES_JP;
  globalThis.DAY_NAMES_EN = DAY_NAMES_EN;
  globalThis.DAY_LABELS_CHART = DAY_LABELS_CHART;
  globalThis.DAY_NAME_JP_TO_EN = DAY_NAME_JP_TO_EN;
  globalThis.MS_PER_WEEK = MS_PER_WEEK;
  globalThis.MS_PER_DAY = MS_PER_DAY;
  globalThis.MAX_DAYS_HISTORY = MAX_DAYS_HISTORY;
  globalThis.CHART_PADDING = CHART_PADDING;
  globalThis.CHART_BAR_WIDTH_RATIO = CHART_BAR_WIDTH_RATIO;
  globalThis.Y_AXIS_CONFIG = Y_AXIS_CONFIG;
  globalThis.CHART_GRID_LINES = CHART_GRID_LINES;
  globalThis.ELEVATION_INPUT = ELEVATION_INPUT;
  globalThis.WEEKLY_TARGET_INPUT = WEEKLY_TARGET_INPUT;
  globalThis.BACKUP_CONFIG = BACKUP_CONFIG;
  globalThis.ISO_YEAR_RANGE = ISO_YEAR_RANGE;
  globalThis.ISO_WEEK_RANGE = ISO_WEEK_RANGE;
}

// Export for CommonJS (testing environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DAY_NAMES_JP,
    DAY_NAMES_EN,
    DAY_LABELS_CHART,
    DAY_NAME_JP_TO_EN,
    MS_PER_WEEK,
    MS_PER_DAY,
    MAX_DAYS_HISTORY,
    CHART_PADDING,
    CHART_BAR_WIDTH_RATIO,
    Y_AXIS_CONFIG,
    CHART_GRID_LINES,
    ELEVATION_INPUT,
    WEEKLY_TARGET_INPUT,
    BACKUP_CONFIG,
    ISO_YEAR_RANGE,
    ISO_WEEK_RANGE,
  };
}
