// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { cn } from "@/shared/lib/utils";
import { badgeGroupGaps } from "../styles/badge.styles";
import { BadgeOverflow } from "./BadgeOverflow";
import { useBadgeGroup } from "../hooks/useBadgeGroup";
import type { BadgeGroupProps } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { BadgeGroupProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * BadgeGroup component for rendering collections of badges or tags.
 * Supports flex wrapping, gap spacing, and automatic `+N` overflow truncation.
 */
export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  (
    {
      children,
      max,
      gap = "md",
      overflowClassName,
      className,
      ...props
    },
    ref,
  ) => {
    // Encapsulate truncation and child slicing via custom hook
    const { visibleChildren, overflowCount, hasOverflow } = useBadgeGroup({
      children,
      max,
    });

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-wrap items-center",
          badgeGroupGaps[gap] ?? badgeGroupGaps.md,
          className,
        )}
        {...props}
      >
        {visibleChildren}
        {hasOverflow && (
          <BadgeOverflow
            count={overflowCount}
            className={overflowClassName}
          />
        )}
      </div>
    );
  },
);

BadgeGroup.displayName = "BadgeGroup";

