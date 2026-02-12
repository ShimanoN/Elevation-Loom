/**
 * Date utility functions for local time handling
 * These functions avoid UTC-related issues when working with date strings
 */

/**
 * Format Date object to "YYYY-MM-DD" string in local time
 * @param date - Date object to format
 * @returns Formatted date string "YYYY-MM-DD"
 */
export function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse "YYYY-MM-DD" string to Date object in local time
 * Note: new Date("YYYY-MM-DD") is interpreted as UTC, so we avoid it
 * @param str - Date string in "YYYY-MM-DD" format
 * @returns Date object in local time (returns current date if invalid)
 */
export function parseDateLocal(str: string): Date {
  if (!str || typeof str !== 'string') {
    console.error('Invalid date string:', str);
    return new Date();
  }
  const [y, m, d] = str.split('-').map(Number);
  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    console.error('Invalid date components:', str);
    return new Date();
  }
  return new Date(y, m - 1, d);
}
