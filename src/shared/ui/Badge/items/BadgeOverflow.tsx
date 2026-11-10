// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "./Badge";
import type { BadgeOverflowProps } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { BadgeOverflowProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * BadgeOverflow component rendering a `+N` indicator for truncated
 * tag lists, participant badges, or overflow collections.
 */
export const BadgeOverflow = React.forwardRef<HTMLSpanElement, BadgeOverflowProps>(
  ({ count, size = "sm", className, ...props }, ref) => {
    // Only render if count is positive
    if (count <= 0) return null;

    return (
      <Badge
        ref={ref}
        variant="outline"
        size={size}
        rounded
        className={cn(
          "font-semibold text-zinc-600 dark:text-zinc-400 border-dashed border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
          className,
        )}
        aria-label={`${count} more items`}
        {...props}
      >
        +{count}
      </Badge>
    );
  },
);

BadgeOverflow.displayName = "BadgeOverflow";

