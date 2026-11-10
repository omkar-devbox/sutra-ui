// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import type { BadgeVariant, BadgeSize, BadgeStatus } from "../types/badge.types";
import {
  BADGE_GROUP_GAPS,
  BADGE_STATUS_VARIANTS,
} from "../constant/badge.constant";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { BadgeVariant, BadgeSize, BadgeStatus } from "../types/badge.types";

// ----------------------------------------------------
// Variant Classes (Tailwind v4 Validated Tokens)
// ----------------------------------------------------

export const badgeVariantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
  primary:
    "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  secondary:
    "bg-zinc-100 text-zinc-900 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700",
  outline:
    "border border-zinc-300 text-zinc-800 bg-transparent dark:border-zinc-700 dark:text-zinc-200",
  success:
    "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
  danger:
    "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  warning:
    "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  info:
    "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
};

// ----------------------------------------------------
// Dot Indicator Colors by Variant
// ----------------------------------------------------

export const badgeDotColors: Record<BadgeVariant, string> = {
  default:   "bg-zinc-500",
  primary:   "bg-blue-600",
  secondary: "bg-zinc-500",
  outline:   "bg-zinc-400",
  success:   "bg-emerald-500",
  danger:    "bg-red-500",
  warning:   "bg-amber-500",
  info:      "bg-sky-500",
};

// ----------------------------------------------------
// Status Indicator Configuration (Online, Offline, Pending, etc.)
// ----------------------------------------------------

export const badgeStatusDotColors: Record<BadgeStatus, string> = {
  online:  "bg-emerald-500",
  offline: "bg-zinc-400",
  pending: "bg-amber-500",
  busy:    "bg-red-500",
  away:    "bg-amber-400",
};

export const badgeStatusVariants: Record<BadgeStatus, BadgeVariant> = BADGE_STATUS_VARIANTS;

// ----------------------------------------------------
// Dot Dimensions
// ----------------------------------------------------

export const badgeDotSizes: Record<BadgeSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-2.5 w-2.5",
};

// ----------------------------------------------------
// Size Dimensions and Typography
// ----------------------------------------------------

export const badgeSizeStyles: Record<BadgeSize, string> = {
  sm: "text-[10px] px-1.5 py-0.5 min-h-[18px] min-w-[18px]",
  md: "text-xs px-2 py-1 min-h-[22px] min-w-[22px]",
  lg: "text-sm px-2.5 py-1.5 min-h-[26px] min-w-[26px]",
};

// ----------------------------------------------------
// BadgeGroup Gap Spacings
// ----------------------------------------------------

export const badgeGroupGaps = BADGE_GROUP_GAPS;

// ----------------------------------------------------
// Shared Base Layout and Animation Classes
// ----------------------------------------------------

export const badgeBaseStyles = {
  /** Always applied to the root badge element */
  root: "inline-flex items-center justify-center font-medium transition-colors duration-200 select-none",
  /** Wrapper around the dot indicator */
  dotWrapper: "relative flex mr-1.5 last:mr-0 items-center justify-center",
  /** Ping animation ring with reduced-motion support */
  dotPing: "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none",
  /** The solid dot indicator */
  dot: "relative inline-flex rounded-full shrink-0",
  /** Icon wrapper — standalone without adjacent sibling spacing */
  iconOnly: "inline-flex items-center justify-center",
  /** Icon wrapper — with right spacing when label/count follows */
  iconWithSibling: "inline-flex items-center justify-center mr-1.5 shrink-0",
} as const;

