// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useState, useCallback, useRef, useEffect } from "react";
import { local } from "@/shared/lib/Storage/localstorage";
import {
  DEFAULT_SIDEBAR_STORAGE_KEY,
  DEFAULT_SIDEBAR_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_WIDTH,
} from "../constant/ai.constant";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export interface UseAiSidebarResizeOptions {
  /** Enables or disables manual dragging */
  resizable?: boolean;
  /** Positioning side for width calculations */
  side?: "left" | "right";
  /** Initial width in pixels */
  defaultWidth?: number;
  /** Minimum allowable width in pixels */
  minWidth?: number;
  /** Maximum allowable width in pixels */
  maxWidth?: number;
  /** Local storage key to persist user width preferences */
  storageKey?: string;
  /** Whether the sidebar is currently open */
  isOpen?: boolean;
}

export interface UseAiSidebarResizeReturn {
  /** Current sidebar width in pixels */
  width: number;
  /** Whether a resize drag operation is active */
  isResizing: boolean;
  /** Initiates drag resize on mouse/touch down */
  startResizing: (event: React.MouseEvent | React.TouchEvent) => void;
  /** Stops drag resize */
  stopResizing: () => void;
  /** Resets width to default initial value */
  resetWidth: () => void;
  /** Sets custom width directly */
  setWidth: (width: number) => void;
  /** Keyboard accessibility handler for resize slider role */
  handleKeyDownResize: (event: React.KeyboardEvent) => void;
}

// ----------------------------------------------------
// Hook Implementation
// ----------------------------------------------------

/**
 * Custom hook to manage responsive sidebar dragging, resizing, min/max limits,
 * keyboard accessibility, and localStorage persistence.
 */
export const useAiSidebarResize = ({
  resizable = true,
  side = "right",
  defaultWidth = DEFAULT_SIDEBAR_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  storageKey = DEFAULT_SIDEBAR_STORAGE_KEY,
  isOpen = true,
}: UseAiSidebarResizeOptions = {}): UseAiSidebarResizeReturn => {
  // Read persisted sidebar width or fallback to defaultWidth
  const [width, setWidthState] = useState<number>(() => {
    if (typeof window !== "undefined" && storageKey) {
      const savedWidth = local.get<number>(storageKey);
      if (
        typeof savedWidth === "number" &&
        savedWidth >= minWidth &&
        savedWidth <= maxWidth
      ) {
        return savedWidth;
      }
    }
    return defaultWidth;
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const isResizingRef = useRef<boolean>(false);

  // Sync width state and localStorage
  const handleWidthChange = useCallback(
    (newWidth: number) => {
      setWidthState(newWidth);
      if (typeof window !== "undefined" && storageKey) {
        local.set(storageKey, newWidth);
      }
    },
    [storageKey]
  );

  const startResizing = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      setIsResizing(true);
      isResizingRef.current = true;
    },
    []
  );

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    isResizingRef.current = false;
  }, []);

  // Compute dynamic width during mouse / touch drag
  const resize = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isResizingRef.current || !resizable) return;

      const clientX =
        "touches" in event && event.touches.length > 0
          ? event.touches[0].clientX
          : (event as MouseEvent).clientX;

      let nextWidth =
        side === "left" ? clientX : window.innerWidth - clientX;

      if (nextWidth < minWidth) nextWidth = minWidth;
      if (nextWidth > maxWidth) nextWidth = maxWidth;

      handleWidthChange(nextWidth);
    },
    [resizable, side, minWidth, maxWidth, handleWidthChange]
  );

  const resetWidth = useCallback(() => {
    handleWidthChange(defaultWidth);
  }, [defaultWidth, handleWidthChange]);

  // Keyboard accessibility handler for resizing
  const handleKeyDownResize = useCallback(
    (event: React.KeyboardEvent) => {
      if (!resizable || !isOpen) return;
      let delta = 0;

      if (event.key === "ArrowLeft") delta = side === "left" ? -10 : 10;
      if (event.key === "ArrowRight") delta = side === "left" ? 10 : -10;

      if (delta !== 0) {
        event.preventDefault();
        const adjustedWidth = Math.min(
          maxWidth,
          Math.max(minWidth, width + delta)
        );
        handleWidthChange(adjustedWidth);
      } else if (event.key === "Home") {
        event.preventDefault();
        handleWidthChange(minWidth);
      } else if (event.key === "End") {
        event.preventDefault();
        handleWidthChange(maxWidth);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        resetWidth();
      }
    },
    [resizable, isOpen, side, width, minWidth, maxWidth, handleWidthChange, resetWidth]
  );

  // Bind global mouse & touch event listeners during dragging
  useEffect(() => {
    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => resize(e);
    const handleMouseUp = () => stopResizing();
    const handleTouchMove = (e: TouchEvent) => resize(e);
    const handleTouchEnd = () => stopResizing();

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, resizable, resize, stopResizing]);

  return {
    width,
    isResizing,
    startResizing,
    stopResizing,
    resetWidth,
    setWidth: handleWidthChange,
    handleKeyDownResize,
  };
};

