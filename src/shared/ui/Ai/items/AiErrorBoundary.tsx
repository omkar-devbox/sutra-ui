// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { Component, type ErrorInfo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import type { AiErrorBoundaryProps } from "../types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export class AiErrorBoundary extends Component<AiErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  /**
   * Updates state so the next render will show the fallback UI.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Logs error details or invokes external monitoring callbacks.
   */
  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    if (process.env.NODE_ENV === "development") {
      console.error("[AiErrorBoundary] Caught rendering error:", error, errorInfo);
    }
  }

  /**
   * Resets the error boundary state to allow re-rendering.
   */
  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public override render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="my-3 flex flex-col items-center gap-2.5 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/90 dark:bg-rose-950/30 p-4 text-center backdrop-blur-sm"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
            <AlertCircle size={18} aria-hidden="true" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-rose-900 dark:text-rose-200">
              Message Render Error
            </p>
            <p className="max-w-[240px] text-[11px] text-rose-700 dark:text-rose-400 leading-normal">
              Could not display this message properly.
            </p>

            {process.env.NODE_ENV === "development" && error?.message && (
              <p className="mt-1 max-w-[260px] truncate text-[10px] font-mono text-rose-600/80 dark:text-rose-400/80">
                {error.message}
              </p>
            )}
          </div>

          <button
            onClick={this.handleReset}
            type="button"
            className="mt-1 flex items-center gap-1.5 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-medium text-rose-700 dark:text-rose-300 transition-colors hover:bg-rose-50 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <RefreshCw size={12} aria-hidden="true" />
            Try again
          </button>
        </div>
      );
    }

    return children;
  }
}
