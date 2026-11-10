// ----------------------------------------------------
// Component Item Exports
// ----------------------------------------------------

export {
  Badge,
  CountBadge,
  formatCountValue,
  StatusBadge,
  DotBadge,
  BadgeGroup,
  BadgeOverflow,
  FilterBadge,
} from "./items";

// ----------------------------------------------------
// Hooks Exports
// ----------------------------------------------------

export {
  useBadgeCount,
  useBadgeGroup,
  useBadgeFilter,
} from "./hooks";
export type {
  UseBadgeCountOptions,
  UseBadgeCountReturn,
  UseBadgeGroupOptions,
  UseBadgeGroupReturn,
  UseBadgeFilterOptions,
  UseBadgeFilterReturn,
} from "./hooks";

// ----------------------------------------------------
// Constants and Configuration Exports
// ----------------------------------------------------

export {
  DEFAULT_MAX_COUNT,
  DEFAULT_STATUS_LABELS,
  BADGE_STATUS_VARIANTS,
  CLOSE_ICON_SIZES,
  BADGE_GROUP_GAPS,
} from "./constant";

// ----------------------------------------------------
// Type and Interface Exports
// ----------------------------------------------------

export type {
  BadgeProps,
  CountBadgeProps,
  StatusBadgeProps,
  DotBadgeProps,
  BadgeGroupProps,
  BadgeOverflowProps,
  FilterBadgeProps,
  BadgeVariant,
  BadgeSize,
  BadgeStatus,
  BadgeGroupGap,
  BadgeTheme,
} from "./types";

// ----------------------------------------------------
// Style Exports
// ----------------------------------------------------

export {
  badgeVariantStyles,
  badgeDotColors,
  badgeStatusDotColors,
  badgeStatusVariants,
  badgeDotSizes,
  badgeSizeStyles,
  badgeGroupGaps,
  badgeBaseStyles,
} from "./styles";
