// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import type React from "react";

// ----------------------------------------------------
// Types and Models
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
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Live system, connection, or user status states.
 */
export type BadgeStatus = "online" | "offline" | "pending" | "busy" | "away";

/**
 * Core props for the base Badge component.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual color variant scheme */
  variant?: BadgeVariant;
  /** Dimension and typography scaling */
  size?: BadgeSize;
  /** Pill shape styling (rounded-full) when true; rounded-md when false */
  rounded?: boolean;
  /** Displays a status dot indicator */
  dot?: boolean;
  /** Applies an animated radar ping behind the dot */
  pulse?: boolean;
  /** Numerical notification counter value */
  count?: number;
  /** Maximum count displayed before overflowing to `${maxCount}+` */
  maxCount?: number;
  /** Preserves rendering when count is exactly 0 */
  showZero?: boolean;
  /** Leading icon node rendered beside text or count */
  icon?: React.ReactNode;
  /** Custom Tailwind class overrides per variant */
  theme?: Partial<Record<BadgeVariant, string>>;
  /** Enables polymorphic rendering via Radix Slot pattern */
  asChild?: boolean;
}

/**
 * Props for the specialized CountBadge component.
 */
export interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numeric count value */
  count: number;
  /** Maximum threshold before showing "+", e.g. 99+ */
  maxCount?: number;
  /** Whether to render when count is 0 */
  showZero?: boolean;
  /** Formats large numbers with thousand separators (e.g. 1,250) */
  formatThousands?: boolean;
  /** Color variant */
  variant?: BadgeVariant;
  /** Dimension size */
  size?: BadgeSize;
  /** Pill shape */
  rounded?: boolean;
  /** Optional wrapped target (e.g. an icon or avatar) to place badge at top-right */
  children?: React.ReactNode;
}

/**
 * Props for the specialized StatusBadge component.
 */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Pre-configured status key */
  status: BadgeStatus;
  /** Custom label (defaults to capitalized status string) */
  label?: React.ReactNode;
  /** Whether the dot has an active pulsing animation */
  pulse?: boolean;
  /** Whether to display the dot indicator */
  showDot?: boolean;
  /** Size variant */
  size?: BadgeSize;
  /** Override color variant */
  variant?: BadgeVariant;
}

/**
 * Props for the standalone DotBadge indicator.
 */
export interface DotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status key to determine dot color */
  status?: BadgeStatus;
  /** Explicit color variant override */
  variant?: BadgeVariant;
  /** Pulse ping animation */
  pulse?: boolean;
  /** Dot dimension size */
  size?: BadgeSize;
  /** Accessible text for screen readers */
  ariaLabel?: string;
}

/**
 * Props for grouping multiple badges with overflow truncation.
 */
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of badges to display before showing +N overflow */
  max?: number;
  /** Spacing between badges */
  gap?: "sm" | "md" | "lg";
  /** Badge children */
  children: React.ReactNode;
  /** Custom class for the overflow indicator */
  overflowClassName?: string;
}

/**
 * Props for the +N overflow badge.
 */
export interface BadgeOverflowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Overflow count value (rendered as +N) */
  count: number;
  /** Size variant */
  size?: BadgeSize;
}

/**
 * Props for interactive filter / dismissible badges.
 */
export interface FilterBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tag label text or element */
  label: React.ReactNode;
  /** Whether the filter tag is currently selected / active */
  active?: boolean;
  /** Callback fired when the remove/close (x) button is clicked */
  onRemove?: () => void;
  /** Visual variant when idle */
  variant?: BadgeVariant;
  /** Visual variant when active */
  activeVariant?: BadgeVariant;
  /** Size scaling */
  size?: BadgeSize;
  /** Disabled state */
  disabled?: boolean;
}

