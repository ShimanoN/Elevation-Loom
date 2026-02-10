/**
 * Formatting utilities for Elevation Loom application
 * Dependencies: constants.js (for DAY_NAMES_JP, DAY_NAME_JP_TO_EN)
 */

/**
 * Get Japanese day name from day index (0 = Sunday, 6 = Saturday)
 * @param {number} dayIndex - Day index (0-6)
 * @returns {string} Japanese day name
 */
function getJPDayName(dayIndex) {
  return DAY_NAMES_JP[dayIndex];
}

/**
 * Get English day name from Japanese day name
 * @param {string} jpDayName - Japanese day name (日, 月, etc.)
 * @returns {string} English day name
 */
function getENDayName(jpDayName) {
  return DAY_NAME_JP_TO_EN[jpDayName] || jpDayName;
}

/**
 * Format ISO week key from year and week number
 * @param {number} isoYear - ISO year
 * @param {number} weekNumber - ISO week number (1-53)
 * @returns {string} Formatted week key (e.g., "2026-W06")
 */
function formatISOWeekKey(isoYear, weekNumber) {
  return `${isoYear}-W${String(weekNumber).padStart(2, '0')}`;
}

/**
 * Format date range for display
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {string} Formatted date range (e.g., "2026/02/03 - 2026/02/09")
 */
function formatDateRangeDisplay(startDate, endDate) {
  return `${startDate.replace(/-/g, '/')} - ${endDate.replace(/-/g, '/')}`;
}

// ============================================================
// Exports
// ============================================================

// Export to global scope for use in non-module scripts
if (typeof globalThis !== 'undefined') {
  globalThis.getJPDayName = getJPDayName;
  globalThis.getENDayName = getENDayName;
  globalThis.formatISOWeekKey = formatISOWeekKey;
  globalThis.formatDateRangeDisplay = formatDateRangeDisplay;
}

// Export for CommonJS (testing environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getJPDayName,
    getENDayName,
    formatISOWeekKey,
    formatDateRangeDisplay,
  };
}
