// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import { useState, useCallback, useRef, useEffect } from "react";
import { DEFAULT_COPY_FEEDBACK_DURATION_MS } from "../constant/ai.constant";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export interface UseClipboardCopyOptions {
  /** Duration in milliseconds to display copied state */
  duration?: number;
  /** Optional callback fired on successful clipboard write */
  onSuccess?: (text: string) => void;
  /** Optional callback fired if write fails */
  onError?: (error: Error) => void;
}

export interface UseClipboardCopyReturn {
  /** Whether the text was recently copied */
  copied: boolean;
  /** Copy text string to system clipboard */
  copyToClipboard: (text: string) => Promise<boolean>;
  /** Resets copied state immediately */
  resetCopied: () => void;
}

// ----------------------------------------------------
// Hook Implementation
// ----------------------------------------------------

/**
 * Custom hook to copy text to the system clipboard with automatic timeout feedback.
 */
export const useClipboardCopy = ({
  duration = DEFAULT_COPY_FEEDBACK_DURATION_MS,
  onSuccess,
  onError,
}: UseClipboardCopyOptions = {}): UseClipboardCopyReturn => {
  const [copied, setCopied] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up any pending timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetCopied = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCopied(false);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          onSuccess?.(text);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setCopied(false);
            timeoutRef.current = null;
          }, duration);

          return true;
        }
        throw new Error("Clipboard API is unavailable in this environment.");
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        onError?.(error);
        return false;
      }
    },
    [duration, onSuccess, onError]
  );

  return {
    copied,
    copyToClipboard,
    resetCopied,
  };
};

