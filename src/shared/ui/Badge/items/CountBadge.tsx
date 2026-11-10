// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "./Badge";
import { DEFAULT_MAX_COUNT } from "../constant/badge.constant";
import type { CountBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { CountBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Error Handling and Helpers
// ----------------------------------------------------

/**
 * Formats a count with optional thousands separators (e.g. 1,250)
 * and threshold overflow indicators (e.g. 99+).
 */
export function formatCountValue(
  count: number,
  maxCount: number = DEFAULT_MAX_COUNT,
  formatThousands: boolean = true,
): string {
  if (count > maxCount) {
    const formattedMax = formatThousands
      ? maxCount.toLocaleString()
      : String(maxCount);
    return `${formattedMax}+`;
  }
  return formatThousands ? count.toLocaleString() : String(count);
}

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * CountBadge component specifically designed for notification counters,
 * unread badges, and e-commerce shopping carts.
 * Supports standalone pills or relative positioning over child icons/avatars.
 */
export const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  (
    {
      count,
      maxCount = DEFAULT_MAX_COUNT,
      showZero = false,
      formatThousands = true,
      variant = "danger",
      size = "sm",
      rounded = true,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    // Visibility guard: hide when 0 unless showZero is explicitly enabled
    if (count === 0 && !showZero) {
      if (!children) return null;
      return <div className="relative inline-flex">{children}</div>;
    }

    const formattedValue = formatCountValue(count, maxCount, formatThousands);

    const badgeElement = (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        className={cn(
          "font-semibold tabular-nums",
          // Relative badge positioning when wrapping child element
          children &&
            "absolute -top-1.5 -right-2 z-10 scale-90 shadow-sm ring-2 ring-white dark:ring-zinc-900",
          className,
        )}
        aria-label={props["aria-label"] ?? `${count} items`}
        {...props}
      >
        {formattedValue}
      </Badge>
    );

    // If wrapping an icon or button, place the badge at the top-right corner
    if (children) {
      return (
        <div className="relative inline-flex items-center justify-center">
          {children}
          {badgeElement}
        </div>
      );
    }

    return badgeElement;
  },
);

CountBadge.displayName = "CountBadge";

