// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import type React from "react";

// ----------------------------------------------------
// Core Badge Variant and Dimension Unions
// ----------------------------------------------------

/**
 * Standard visual color variants across the Sutra UI Badge system.
 */
export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "danger"
  | "warning"
  | "info";

/**
 * Dimension and font scaling options.
 * - `sm`: compact indicator, suitable for table cells and inline tags
 * - `md`: standard size for labels, counters, and chips
 * - `lg`: emphasized size for high-priority notices and hero elements
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Semantic connection, operational health, or user presence states.
 */
export type BadgeStatus = "online" | "offline" | "pending" | "busy" | "away";

/**
 * Gap spacing presets supported by the `BadgeGroup` flex container.
 */
export type BadgeGroupGap = "sm" | "md" | "lg";

/**
 * Custom Tailwind class overrides mapped per visual variant.
 */
export type BadgeTheme = Partial<Record<BadgeVariant, string>>;

// ----------------------------------------------------
// Core Base Badge Models
// ----------------------------------------------------

/**
 * Core props for the universal `Badge` component.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual color variant scheme */
  variant?: BadgeVariant;
  /** Dimension and typography scaling */
  size?: BadgeSize;
  /** Pill shape styling (rounded-full) when true; rounded-md when false */
  rounded?: boolean;
  /** Displays a status dot indicator beside text */
  dot?: boolean;
  /** Applies an animated radar ping behind the dot */
  pulse?: boolean;
  /** Numerical notification counter value */
  count?: number;
  /** Maximum count displayed before overflowing to `${maxCount}+` (default: 99) */
  maxCount?: number;
  /** Preserves rendering when count is exactly 0 (default: false) */
  showZero?: boolean;
  /** Leading icon node rendered beside text or count */
  icon?: React.ReactNode;
  /** Custom Tailwind class overrides per variant */
  theme?: BadgeTheme;
  /** Enables polymorphic rendering via Radix UI Slot pattern */
  asChild?: boolean;
}

// ----------------------------------------------------
// Notification and Counter Badge Models
// ----------------------------------------------------

/**
 * Props for the specialized `CountBadge` component.
 * Supports standalone numerical pills or floating top-right notification bubbles.
 */
export interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numeric count value */
  count: number;
  /** Maximum threshold before appending "+" (default: 99 -> "99+") */
  maxCount?: number;
  /** Whether to render when count is 0 (default: false) */
  showZero?: boolean;
  /** Formats large numbers with localized thousand separators (e.g. 1,250) */
  formatThousands?: boolean;
  /** Visual color variant scheme */
  variant?: BadgeVariant;
  /** Dimension size */
  size?: BadgeSize;
  /** Pill rounded-full shape styling */
  rounded?: boolean;
  /** Optional wrapped target (e.g. icon or avatar) to anchor badge at top-right */
  children?: React.ReactNode;
}

// ----------------------------------------------------
// Presence and Status Dot Models
// ----------------------------------------------------

/**
 * Props for the standardized `StatusBadge` component (e.g. ● Online, ● Busy).
 */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Pre-configured presence or operational status key */
  status: BadgeStatus;
  /** Custom text label (defaults to capitalized status string) */
  label?: React.ReactNode;
  /** Whether the dot displays an active pulsing radar animation */
  pulse?: boolean;
  /** Whether to display the dot indicator beside the label (default: true) */
  showDot?: boolean;
  /** Dimension size */
  size?: BadgeSize;
  /** Optional visual color variant override */
  variant?: BadgeVariant;
}

/**
 * Props for the standalone `DotBadge` ultra-compact indicator.
 * Ideal for avatar presence indicators, live broadcast markers, and table status cells.
 */
export interface DotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic status key to determine dot color */
  status?: BadgeStatus;
  /** Explicit color variant override */
  variant?: BadgeVariant;
  /** Animated radar ping ring behind the dot */
  pulse?: boolean;
  /** Dot dimension size */
  size?: BadgeSize;
  /** Accessible text for screen readers */
  ariaLabel?: string;
}

// ----------------------------------------------------
// Collection and Overflow Models
// ----------------------------------------------------

/**
 * Props for the `BadgeGroup` flex container.
 * Supports responsive wrapping and automatic truncation with a `+N` badge.
 */
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of badges to display before showing +N overflow indicator */
  max?: number;
  /** Spacing preset between badges (sm: 6px, md: 8px, lg: 12px) */
  gap?: BadgeGroupGap;
  /** Badge items to display */
  children: React.ReactNode;
  /** Custom className applied to the overflow indicator badge */
  overflowClassName?: string;
}

/**
 * Props for the `BadgeOverflow` +N truncated counter badge.
 */
export interface BadgeOverflowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Truncated overflow count value (rendered as +N) */
  count: number;
  /** Size scaling */
  size?: BadgeSize;
}

// ----------------------------------------------------
// Interactive Filter Chip Models
// ----------------------------------------------------

/**
 * Props for interactive filter / dismissible badges (e.g. "React ×", "Pending ×").
 */
export interface FilterBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tag label text or element */
  label: React.ReactNode;
  /** Whether the filter tag is currently selected / active */
  active?: boolean;
  /** Callback fired when the remove/dismiss (×) button is clicked */
  onRemove?: () => void;
  /** Optional click handler for toggling filter selection */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** Visual variant scheme when idle / unselected */
  variant?: BadgeVariant;
  /** Visual variant scheme when active / selected */
  activeVariant?: BadgeVariant;
  /** Size scaling */
  size?: BadgeSize;
  /** Disabled state disabling interactions and click events */
  disabled?: boolean;
}
