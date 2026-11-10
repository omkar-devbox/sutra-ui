// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import { useState, useCallback } from "react";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export interface UseBadgeFilterOptions<T extends string = string> {
  /** Initial selected filter keys */
  initialSelected?: T[];
  /** Allow multiple selected filters simultaneously (default: true) */
  multiSelect?: boolean;
  /** Callback fired whenever the active selection changes */
  onChange?: (selected: T[]) => void;
}

export interface UseBadgeFilterReturn<T extends string = string> {
  /** Array of currently active filter keys */
  selected: T[];
  /** Checks if a specific key is currently active */
  isSelected: (key: T) => boolean;
  /** Toggles active state of a filter key */
  toggle: (key: T) => void;
  /** Adds a filter key to selection */
  select: (key: T) => void;
  /** Removes a filter key from selection */
  deselect: (key: T) => void;
  /** Clears all selected filter keys */
  clear: () => void;
  /** Replaces selected filters with a new list */
  setSelected: (keys: T[]) => void;
}

// ----------------------------------------------------
// Hook Logic
// ----------------------------------------------------

/**
 * Custom hook to manage state for interactive FilterBadge chip collections.
 * Supports multi-select, single-select, toggling, and removal.
 */
export const useBadgeFilter = <T extends string = string>({
  initialSelected = [],
  multiSelect = true,
  onChange,
}: UseBadgeFilterOptions<T> = {}): UseBadgeFilterReturn<T> => {
  const [selected, setSelectedState] = useState<T[]>(initialSelected);

  const setSelected = useCallback(
    (newKeys: T[]) => {
      setSelectedState(newKeys);
      onChange?.(newKeys);
    },
    [onChange],
  );

  const isSelected = useCallback(
    (key: T) => selected.includes(key),
    [selected],
  );

  const select = useCallback(
    (key: T) => {
      setSelectedState((prev) => {
        if (prev.includes(key)) return prev;
        const next = multiSelect ? [...prev, key] : [key];
        onChange?.(next);
        return next;
      });
    },
    [multiSelect, onChange],
  );

  const deselect = useCallback(
    (key: T) => {
      setSelectedState((prev) => {
        if (!prev.includes(key)) return prev;
        const next = prev.filter((item) => item !== key);
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const toggle = useCallback(
    (key: T) => {
      setSelectedState((prev) => {
        const exists = prev.includes(key);
        let next: T[];
        if (exists) {
          next = prev.filter((item) => item !== key);
        } else {
          next = multiSelect ? [...prev, key] : [key];
        }
        onChange?.(next);
        return next;
      });
    },
    [multiSelect, onChange],
  );

  const clear = useCallback(() => {
    setSelectedState([]);
    onChange?.([]);
  }, [onChange]);

  return {
    selected,
    isSelected,
    toggle,
    select,
    deselect,
    clear,
    setSelected,
  };
};

