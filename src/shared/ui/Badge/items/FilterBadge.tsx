// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Badge } from "./Badge";
import { CLOSE_ICON_SIZES } from "../constant/badge.constant";
import type { FilterBadgeProps, BadgeSize } from "../types/badge.types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { FilterBadgeProps } from "../types/badge.types";

// ----------------------------------------------------
// Component Logic
// ----------------------------------------------------

/**
 * FilterBadge component for interactive, dismissible search tags and filters
 * (e.g. React ×, Active ×, Filter ×).
 */
export const FilterBadge = React.forwardRef<HTMLSpanElement, FilterBadgeProps>(
  (
    {
      label,
      active = false,
      onRemove,
      onClick,
      variant = "default",
      activeVariant = "primary",
      size = "md",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Select styling variant based on active selection state
    const currentVariant = active ? activeVariant : variant;
    const isClickable = Boolean(onClick) && !disabled;

    // Handle keyboard activation for whole tag
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLSpanElement>);
      }
    };

    // Handle remove button click
    const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (!disabled) {
        onRemove?.();
      }
    };

    const labelString = typeof label === "string" ? label : "filter";

    return (
      <Badge
        ref={ref}
        variant={currentVariant}
        size={size}
        rounded
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        className={cn(
          "inline-flex items-center gap-1 transition-all select-none",
          isClickable && "cursor-pointer hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
          active && "ring-1 ring-blue-500/50 shadow-xs font-semibold",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className,
        )}
        {...props}
      >
        <span>{label}</span>

        {/* Dismiss / Close (×) Action Button */}
        {onRemove && (
          <button
            type="button"
            disabled={disabled}
            onClick={handleRemoveClick}
            aria-label={`Remove ${labelString}`}
            className="inline-flex items-center justify-center rounded-full p-0.5 ml-0.5 -mr-1 text-current opacity-60 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-current"
          >
            <X className={CLOSE_ICON_SIZES[size] ?? CLOSE_ICON_SIZES.md} aria-hidden="true" />
          </button>
        )}
      </Badge>
    );
  },
);

FilterBadge.displayName = "FilterBadge";
