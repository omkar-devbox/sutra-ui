// ----------------------------------------------------
// Public Component Item Exports
// ----------------------------------------------------

export {
  AiChat,
  AiSidebar,
  AiSidebarHeader,
  AiChatArea,
  AiChatInput,
  AiErrorBoundary,
  CodeBlock,
  FileAttachment,
} from "./items";

// ----------------------------------------------------
// Hook and State Management Exports
// ----------------------------------------------------

export {
  useAiChat,
  useAiSidebarResize,
  useClipboardCopy,
} from "./hooks";
export type {
  UseAiSidebarResizeOptions,
  UseAiSidebarResizeReturn,
  UseClipboardCopyOptions,
  UseClipboardCopyReturn,
} from "./hooks";

// ----------------------------------------------------
// Constants and Dynamic Configuration Exports
// ----------------------------------------------------

export {
  DEFAULT_MAX_MESSAGES,
  DEFAULT_SIDEBAR_STORAGE_KEY,
  DEFAULT_SIDEBAR_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_WIDTH,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_MAX_FILES,
  DEFAULT_MAX_TEXTAREA_HEIGHT,
  DEFAULT_MESSAGE_GAP_PX,
  DEFAULT_ROW_ESTIMATED_HEIGHT_PX,
  DEFAULT_COPY_FEEDBACK_DURATION_MS,
  DEFAULT_SUGGESTIONS,
} from "./constant";

// ----------------------------------------------------
// Style Exports
// ----------------------------------------------------

export {
  aiSidebarStyles,
  aiSidebarHeaderStyles,
  aiChatAreaStyles,
  aiChatMessageStyles,
  aiChatInputStyles,
  aiCodeBlockStyles,
} from "./styles";

// ----------------------------------------------------
// Type and Interface Exports
// ----------------------------------------------------

export * from "./types";
