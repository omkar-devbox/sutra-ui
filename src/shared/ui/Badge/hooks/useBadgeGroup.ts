// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useMemo } from "react";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export interface UseBadgeGroupOptions {
  /** React children containing individual badges */
  children: React.ReactNode;
  /** Maximum number of badges to display before truncation */
  max?: number;
}

export interface UseBadgeGroupReturn {
  /** Visible slice of badge elements */
  visibleChildren: React.ReactNode[];
  /** Total count of valid badge children */
  totalCount: number;
  /** Truncated excess count (0 if no overflow) */
  overflowCount: number;
  /** Whether the collection has exceeded the max display cap */
  hasOverflow: boolean;
}

// ----------------------------------------------------
// Hook Logic
// ----------------------------------------------------

/**
 * Custom hook for collections of badges or tags.
 * Computes visible elements and calculates overflow counts cleanly.
 */
export const useBadgeGroup = ({
  children,
  max,
}: UseBadgeGroupOptions): UseBadgeGroupReturn => {
  return useMemo(() => {
    // Flatten and filter valid React children
    const childArray = React.Children.toArray(children).filter(Boolean);
    const totalCount = childArray.length;

    // Check if truncation should take effect
    const shouldTruncate = typeof max === "number" && max > 0 && totalCount > max;
    const visibleChildren = shouldTruncate ? childArray.slice(0, max) : childArray;
    const overflowCount = shouldTruncate ? totalCount - max : 0;
    const hasOverflow = shouldTruncate;

    return {
      visibleChildren,
      totalCount,
      overflowCount,
      hasOverflow,
    };
  }, [children, max]);
};

