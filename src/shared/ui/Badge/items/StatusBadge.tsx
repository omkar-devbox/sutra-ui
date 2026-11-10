// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "./Badge";
import {
  badgeStatusDotColors,
  badgeStatusVariants,
} from "../styles/badge.styles";
import { DEFAULT_STATUS_LABELS } from "../constant/badge.constant";
import type { StatusBadgeProps, BadgeStatus } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { StatusBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * StatusBadge component for rendering standardized system, user presence,
 * or operational statuses (e.g. ● Online, ● Pending, ● Offline).
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      label,
      pulse,
      showDot = true,
      size = "md",
      variant,
      className,
      ...props
    },
    ref,
  ) => {
    // Automatically pair status with appropriate visual variant
    const resolvedVariant = variant ?? badgeStatusVariants[status] ?? "default";
    const statusDotColor = badgeStatusDotColors[status] ?? "bg-zinc-400";
    const displayLabel = label ?? DEFAULT_STATUS_LABELS[status] ?? status;

    // By default, pulse online and pending statuses
    const shouldPulse = pulse ?? (status === "online" || status === "pending");

    return (
      <Badge
        ref={ref}
        variant={resolvedVariant}
        size={size}
        dot={showDot}
        pulse={shouldPulse}
        rounded
        theme={{
          [resolvedVariant]: undefined,
        }}
        className={cn("capitalize tracking-tight", className)}
        role="status"
        aria-label={props["aria-label"] ?? `Status: ${displayLabel}`}
        {...props}
      >
        {displayLabel}
      </Badge>
    );
  },
);

StatusBadge.displayName = "StatusBadge";

