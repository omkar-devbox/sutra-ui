// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import { useMemo } from "react";
import { DEFAULT_MAX_COUNT } from "../constant/badge.constant";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export interface UseBadgeCountOptions {
  /** Raw numeric counter value */
  count?: number;
  /** Ceiling count before appending '+' (defaults to 99) */
  maxCount?: number;
  /** If false, hides the badge when count is zero */
  showZero?: boolean;
}

export interface UseBadgeCountReturn {
  /** Formatted count string (e.g. "5", "99+") or undefined */
  displayCount: string | number | undefined;
  /** Whether the count badge should be visible */
  isVisible: boolean;
  /** Whether the count exceeded maxCount */
  isOverflowing: boolean;
  /** Preformatted accessible screen reader label */
  ariaLabel: string | undefined;
}

// ----------------------------------------------------
// Hook Logic
// ----------------------------------------------------

/**
 * Custom hook to format notification counters, calculate overflow states,
 * and manage counter visibility cleanly.
 */
export const useBadgeCount = ({
  count,
  maxCount = DEFAULT_MAX_COUNT,
  showZero = false,
}: UseBadgeCountOptions): UseBadgeCountReturn => {
  return useMemo(() => {
    // Validate if count is a valid number
    const isValidNumber = typeof count === "number" && !Number.isNaN(count);

    if (!isValidNumber) {
      return {
        displayCount: undefined,
        isVisible: false,
        isOverflowing: false,
        ariaLabel: undefined,
      };
    }

    // Visibility decision: hide if zero unless showZero is true
    const isVisible = count !== 0 || showZero;
    const isOverflowing = count > maxCount;
    const displayCount = isOverflowing ? `${maxCount}+` : count;

    // Accessible ARIA label
    const ariaLabel = `${count} ${count === 1 ? "notification" : "notifications"}`;

    return {
      displayCount,
      isVisible,
      isOverflowing,
      ariaLabel,
    };
  }, [count, maxCount, showZero]);
};

