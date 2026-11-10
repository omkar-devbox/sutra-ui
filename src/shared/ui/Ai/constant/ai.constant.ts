// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import type { AiSuggestion } from "../types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { AiSuggestion } from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

/**
 * Maximum count of chat history messages held in memory before truncation.
 */
export const DEFAULT_MAX_MESSAGES = 100;

/**
 * Default sidebar storage key used to persist user width preferences.
 */
export const DEFAULT_SIDEBAR_STORAGE_KEY = "ai_sidebar_width";

/**
 * Default width in pixels when the AI sidebar first mounts.
 */
export const DEFAULT_SIDEBAR_WIDTH = 400;

/**
 * Minimum allowable sidebar width during manual resize drag actions.
 */
export const DEFAULT_MIN_WIDTH = 320;

/**
 * Maximum allowable sidebar width during manual resize drag actions.
 */
export const DEFAULT_MAX_WIDTH = 800;

/**
 * Default transition and sliding duration in seconds for open/close animation.
 */
export const DEFAULT_ANIMATION_DURATION = 0.28;

/**
 * Maximum number of simultaneous file attachments allowed in a single prompt.
 */
export const DEFAULT_MAX_FILES = 5;

/**
 * Maximum auto-expanding textarea height in pixels before enabling vertical scroll.
 */
export const DEFAULT_MAX_TEXTAREA_HEIGHT = 200;

/**
 * Default vertical gap between chat bubbles in pixels.
 */
export const DEFAULT_MESSAGE_GAP_PX = 18;

/**
 * Estimated row height in pixels used by virtualized message lists.
 */
export const DEFAULT_ROW_ESTIMATED_HEIGHT_PX = 90;

/**
 * Duration in milliseconds to show the "Copied!" confirmation checkmark.
 */
export const DEFAULT_COPY_FEEDBACK_DURATION_MS = 2000;

/**
 * Default quick-prompt suggestions shown in empty chat states.
 */
export const DEFAULT_SUGGESTIONS: AiSuggestion[] = [
  { id: "1", label: "Summarize this page", action: "summarize" },
  { id: "2", label: "Write a React component", action: "code" },
  { id: "3", label: "Explain key architectural concepts", action: "explain" },
];

