// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { motion } from "framer-motion";
import { AiChat } from "./AiChat";
import { aiSidebarStyles } from "../styles/aiSidebar.styles";
import type { AiSidebarProps } from "../types";
import { local } from "@/shared/lib/Storage/localstorage";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const DEFAULT_SIDEBAR_STORAGE_KEY = "ai_sidebar_width";
const DEFAULT_SIDEBAR_WIDTH = 400;
const DEFAULT_MIN_WIDTH = 320;
const DEFAULT_MAX_WIDTH = 800;
const DEFAULT_ANIMATION_DURATION = 0.28;

// ----------------------------------------------------
// Component Implementation
// ----------------------------------------------------

export const AiSidebar: React.FC<AiSidebarProps> = ({
  isOpen,
  onClose,
  resizable = true,
  side = "right",
  defaultWidth = DEFAULT_SIDEBAR_WIDTH,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  storageKey = DEFAULT_SIDEBAR_STORAGE_KEY,
  styleConfig,
  className,
  title = "AI Assistant",
  subtitle,
  icon,
  closeIcon,
  showCloseButton = true,
  initialMessages,
  systemContext,
  suggestions,
  onSuggestionClick,
  placeholder,
  showAvatars,
  showTimestamps,
  userAvatar,
  assistantAvatar,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  renderEmptyState,
  renderTypingIndicator,
  renderHeaderActions,
  allowedFileTypes,
  maxFileSize,
  maxFiles,
  onAttachmentError,
  showAttachButton,
  formatTimestamp,
  autoScroll,
  messageGap,
  onMessageSent,
  onMessageReceived,
  animate = true,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  hideBackdropOnDesktop = true,
}) => {
  // --------------------------------------------------
  // Sidebar Dimension State & Drag Handlers
  // --------------------------------------------------

  // Read persisted sidebar width or fallback to defaultWidth
  const [width, setWidth] = useState<number>(() => {
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
      setWidth(newWidth);
      if (typeof window !== "undefined" && storageKey) {
        local.set(storageKey, newWidth);
      }
    },
    [storageKey]
  );

  const startResizing = useCallback(
    (event: ReactMouseEvent | ReactTouchEvent) => {
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

  const handleResetWidth = useCallback(() => {
    handleWidthChange(defaultWidth);
  }, [defaultWidth, handleWidthChange]);

  // --------------------------------------------------
  // Keyboard Navigation & Accessibility Handlers
  // --------------------------------------------------

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
        handleResetWidth();
      }
    },
    [resizable, isOpen, side, minWidth, maxWidth, width, handleWidthChange, handleResetWidth]
  );

  // --------------------------------------------------
  // Window Drag Listeners & Cleanup Lifecycle
  // --------------------------------------------------

  // Lock text selection and set resize cursor while dragging
  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);

  // Attach global drag event listeners
  useEffect(() => {
    if (!isResizing || !resizable) return;

    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    window.addEventListener("touchmove", resize, { passive: true });
    window.addEventListener("touchend", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
      window.removeEventListener("touchmove", resize);
      window.removeEventListener("touchend", stopResizing);
    };
  }, [isResizing, resize, stopResizing, resizable]);

  // Close sidebar on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const sidebarStyles = styleConfig?.sidebar;
  const sidebarInlineStyle = useMemo(
    () => ({
      backgroundColor: sidebarStyles?.bg,
      borderColor: sidebarStyles?.border,
      borderRadius: sidebarStyles?.radius,
      boxShadow: sidebarStyles?.shadow,
    }),
    [sidebarStyles]
  );

  return (
    <>
      {/* Mobile Backdrop Overlay (fixed inset-0 for full viewport coverage) */}
      {isOpen && (
        <div
          className={aiSidebarStyles.backdrop(
            sidebarStyles?.backdropBg,
            sidebarStyles?.backdropBlur
          )}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Main Animated Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? width : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={
          !animate || isResizing
            ? { duration: 0 }
            : { duration: animationDuration, ease: [0.32, 0.72, 0, 1] }
        }
        className={aiSidebarStyles.aside(isResizing, side)}
        style={sidebarInlineStyle}
        aria-hidden={!isOpen}
      >
        <div
          style={{ width: `${width}px` }}
          className="flex h-full flex-col relative overflow-hidden shrink-0"
        >
          {/* Draggable Resizing Handle */}
          {resizable && isOpen && (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize AI sidebar width"
              aria-valuenow={width}
              aria-valuemin={minWidth}
              aria-valuemax={maxWidth}
              tabIndex={0}
              onMouseDown={startResizing}
              onTouchStart={startResizing}
              onDoubleClick={handleResetWidth}
              onKeyDown={handleKeyDownResize}
              className={aiSidebarStyles.resizeHandle(isResizing, side)}
              title="Drag or use arrow keys to resize AI sidebar. Double-click to reset."
            >
              <div
                className={aiSidebarStyles.resizeIndicator(isResizing, side)}
                style={{
                  backgroundColor: sidebarStyles?.resizeHandleColor,
                }}
              />
            </div>
          )}

          {/* AI Chat Interface Content */}
          {isOpen && (
            <AiChat
              className={className}
              onClose={onClose}
              showCloseButton={showCloseButton}
              title={title}
              subtitle={subtitle}
              icon={icon}
              closeIcon={closeIcon}
              initialMessages={initialMessages}
              systemContext={systemContext}
              suggestions={suggestions}
              onSuggestionClick={onSuggestionClick}
              placeholder={placeholder}
              showAvatars={showAvatars}
              showTimestamps={showTimestamps}
              userAvatar={userAvatar}
              assistantAvatar={assistantAvatar}
              emptyStateTitle={emptyStateTitle}
              emptyStateDescription={emptyStateDescription}
              emptyStateIcon={emptyStateIcon}
              renderEmptyState={renderEmptyState}
              renderTypingIndicator={renderTypingIndicator}
              renderHeaderActions={renderHeaderActions}
              allowedFileTypes={allowedFileTypes}
              maxFileSize={maxFileSize}
              maxFiles={maxFiles}
              onAttachmentError={onAttachmentError}
              showAttachButton={showAttachButton}
              formatTimestamp={formatTimestamp}
              autoScroll={autoScroll}
              messageGap={messageGap}
              onMessageSent={onMessageSent}
              onMessageReceived={onMessageReceived}
              styleConfig={styleConfig}
            />
          )}
        </div>
      </motion.aside>
    </>
  );
};
