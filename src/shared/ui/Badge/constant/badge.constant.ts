// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import type { BadgeSize, BadgeStatus, BadgeVariant } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { BadgeSize, BadgeStatus, BadgeVariant } from "../types/badge.types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

/**
 * Default maximum count displayed before appending '+' (e.g. 99 -> "99+").
 */
export const DEFAULT_MAX_COUNT = 99;

/**
 * Default human-readable labels for standard presence and system health states.
 */
export const DEFAULT_STATUS_LABELS: Record<BadgeStatus, string> = {
  online: "Online",
  offline: "Offline",
  pending: "Pending",
  busy: "Busy",
  away: "Away",
};

/**
 * Mapping of status types to their default visual badge variants.
 */
export const BADGE_STATUS_VARIANTS: Record<BadgeStatus, BadgeVariant> = {
  online: "success",
  offline: "default",
  pending: "warning",
  busy: "danger",
  away: "warning",
};

/**
 * Dimensions for dismissible close 'X' icons in FilterBadge across sizes.
 */
export const CLOSE_ICON_SIZES: Record<BadgeSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

/**
 * Gap spacing configurations for BadgeGroup flex container.
 */
export const BADGE_GROUP_GAPS = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
} as const;

