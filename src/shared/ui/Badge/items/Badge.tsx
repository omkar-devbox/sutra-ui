// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib/utils";
import {
  badgeBaseStyles,
  badgeDotColors,
  badgeDotSizes,
  badgeSizeStyles,
  badgeVariantStyles,
} from "../styles/badge.styles";
import { DEFAULT_MAX_COUNT } from "../constant/badge.constant";
import type { BadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { BadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * Universal Badge component for general status indicators, tags, and category labels.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      rounded = false,
      dot = false,
      pulse = false,
      count,
      maxCount = DEFAULT_MAX_COUNT,
      showZero = false,
      icon,
      theme = {},
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Determine whether content (text children or leading icon) is supplied
    const hasContent = Boolean(children || icon);

    // Validate numeric counter values
    const isCountValid = typeof count === "number" && !isNaN(count);

    // Evaluate count visibility rules
    const shouldShowCount = isCountValid && (count !== 0 || showZero);

    // If count is zero without showZero and no other content exists, unmount cleanly
    if (count !== undefined && count === 0 && !showZero && !hasContent) {
      return null;
    }

    // Calculate overflow counter text (e.g. "99+")
    const displayCount =
      isCountValid && count > maxCount ? `${maxCount}+` : count;

    // Resolve variant styling with custom theme fallbacks
    const activeVariant =
      theme?.[variant] ?? badgeVariantStyles[variant] ?? badgeVariantStyles.default;
    const activeDotColor = badgeDotColors[variant] ?? badgeDotColors.default;
    const base = badgeBaseStyles;

    // Resolve component tag (Slot for asChild or standard span)
    const Comp = asChild ? Slot : "span";

    // Build accessible label for screen readers
    const defaultAriaLabel = isCountValid
      ? `${count} ${count === 1 ? "notification" : "notifications"}`
      : undefined;

    // Standalone status dot role
    const isStandaloneStatusDot = dot && !children && count === undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          base.root,
          badgeSizeStyles[size],
          activeVariant,
          rounded ? "rounded-full" : "rounded-md",
          // Only apply p-0 if dot indicator is rendered without label or count
          dot && !children && count === undefined && "p-0",
          className,
        )}
        aria-label={props["aria-label"] ?? defaultAriaLabel}
        role={isStandaloneStatusDot ? "status" : props.role}
        {...props}
      >
        {/* Dot indicator with optional ping animation */}
        {dot && (
          <span className={base.dotWrapper} aria-hidden="true">
            {pulse && (
              <span className={cn(base.dotPing, activeDotColor)} />
            )}
            <span
              className={cn(
                base.dot,
                badgeDotSizes[size],
                activeDotColor,
              )}
            />
          </span>
        )}

        {/* Optional leading icon */}
        {icon && (
          <span
            className={
              children || shouldShowCount
                ? base.iconWithSibling
                : base.iconOnly
            }
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {/* Children label slot */}
        {children && <span>{children}</span>}

        {/* Dynamic counter slot */}
        {shouldShowCount && (
          <span className={cn(children && "ml-1.5")}>
            {displayCount}
          </span>
        )}
      </Comp>
    );
  },
);

Badge.displayName = "Badge";
