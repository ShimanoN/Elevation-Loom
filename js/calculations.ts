/**
 * Calculation utilities for weekly totals and progress tracking
 */

import { getDayLogsByWeek } from './db.js';
import { ISO_YEAR_RANGE, ISO_WEEK_RANGE } from './constants.js';

// ============================================================
// Type Definitions
// ============================================================

/**
 * Weekly progress calculation result
 */
export interface WeekProgress {
  /** Difference from target (null if no target) */
  diff: number | null;
  /** Percentage of target achieved (null if no target) */
  percentage: number | null;
}

// ============================================================
// Week Total Calculation
// ============================================================

/**
 * Calculate total elevation gained for a specific week
 * @param iso_year - ISO year
 * @param week_number - ISO week number (1-53)
 * @returns Promise resolving to total elevation for the week
 */
export async function calculateWeekTotal(
  iso_year: number,
  week_number: number
): Promise<number> {
  try {
    // Validate inputs
    if (
      !Number.isInteger(iso_year) ||
      iso_year < ISO_YEAR_RANGE.min ||
      iso_year > ISO_YEAR_RANGE.max
    ) {
      console.error('Invalid iso_year:', iso_year);
      return 0;
    }
    if (
      !Number.isInteger(week_number) ||
      week_number < ISO_WEEK_RANGE.min ||
      week_number > ISO_WEEK_RANGE.max
    ) {
      console.error('Invalid week_number:', week_number);
      return 0;
    }

    const logs = await getDayLogsByWeek(iso_year, week_number);
    if (!Array.isArray(logs)) {
      console.error('Invalid logs data:', logs);
      return 0;
    }
    return logs.reduce((sum, log) => sum + (log.elevation_total || 0), 0);
  } catch (error) {
    console.error('Error calculating week total:', error);
    return 0;
  }
}

// ============================================================
// Progress Calculation
// ============================================================

/**
 * Calculate progress against weekly target
 * @param current_total - Current week total elevation
 * @param target - Weekly target elevation (nullable)
 * @returns Progress information with diff and percentage
 */
export function calculateWeekProgress(
  current_total: number,
  target: number | null | undefined
): WeekProgress {
  if (target === null || target === undefined || target === 0) {
    if (target === 0) {
      return { diff: current_total, percentage: 100 };
    }
    return { diff: null, percentage: null };
  }
  const diff = current_total - target;
  const percentage = Math.round((current_total / target) * 100);
  return { diff, percentage };
}
