/**
 * Formatting utilities for Elevation Loom application
 */

import { DAY_NAMES_JP, DAY_NAME_JP_TO_EN } from './constants.js';

/**
 * Get Japanese day name from day index (0 = Sunday, 6 = Saturday)
 * @param dayIndex - Day index (0-6)
 * @returns Japanese day name
 */
export function getJPDayName(dayIndex: number): string {
  return DAY_NAMES_JP[dayIndex];
}

/**
 * Get English day name from Japanese day name
 * @param jpDayName - Japanese day name (日, 月, etc.)
 * @returns English day name
 */
export function getENDayName(jpDayName: string): string {
  return DAY_NAME_JP_TO_EN[jpDayName] || jpDayName;
}

/**
 * Format ISO week key from year and week number
 * @param isoYear - ISO year
 * @param weekNumber - ISO week number (1-53)
 * @returns Formatted week key (e.g., "2026-W06")
 */
export function formatISOWeekKey(isoYear: number, weekNumber: number): string {
  return `${isoYear}-W${String(weekNumber).padStart(2, '0')}`;
}

/**
 * Format date range for display
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Formatted date range (e.g., "2026/02/03 - 2026/02/09")
 */
export function formatDateRangeDisplay(
  startDate: string,
  endDate: string
): string {
  return `${startDate.replace(/-/g, '/')} - ${endDate.replace(/-/g, '/')}`;
}
