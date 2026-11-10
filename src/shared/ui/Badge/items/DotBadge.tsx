// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { cn } from "@/shared/lib/utils";
import {
  badgeBaseStyles,
  badgeDotColors,
  badgeDotSizes,
  badgeStatusDotColors,
} from "../styles/badge.styles";
import type { DotBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { DotBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * DotBadge component rendering an ultra-compact status dot indicator.
 * Ideal for avatar presence indicators, live broadcast badges, or compact table cells.
 */
export const DotBadge = React.forwardRef<HTMLSpanElement, DotBadgeProps>(
  (
    {
      status,
      variant = "default",
      pulse = false,
      size = "md",
      ariaLabel,
      className,
      ...props
    },
    ref,
  ) => {
    // Resolve dot color based on status key or variant
    const dotColor = status
      ? badgeStatusDotColors[status] ?? "bg-zinc-400"
      : badgeDotColors[variant] ?? badgeDotColors.default;

    const base = badgeBaseStyles;
    const computedAriaLabel = ariaLabel ?? (status ? `Status: ${status}` : "Status indicator");

    return (
      <span
        ref={ref}
        role="status"
        aria-label={computedAriaLabel}
        className={cn("relative inline-flex items-center justify-center shrink-0", className)}
        {...props}
      >
        {pulse && (
          <span className={cn(base.dotPing, dotColor)} aria-hidden="true" />
        )}
        <span
          className={cn(base.dot, badgeDotSizes[size], dotColor)}
          aria-hidden="true"
        />
      </span>
    );
  },
);

DotBadge.displayName = "DotBadge";

