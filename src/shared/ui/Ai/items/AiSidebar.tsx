// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, {
  useEffect,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { AiChat } from "./AiChat";
import { aiSidebarStyles } from "../styles/aiSidebar.styles";
import { useAiSidebarResize } from "../hooks/useAiSidebarResize";
import {
  DEFAULT_SIDEBAR_STORAGE_KEY,
  DEFAULT_SIDEBAR_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_WIDTH,
  DEFAULT_ANIMATION_DURATION,
} from "../constant/ai.constant";
import type { AiSidebarProps } from "../types";

// ----------------------------------------------------
// Types and Models
// ----------------------------------------------------

export type { AiSidebarProps } from "../types";

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
  // Sidebar Dimension State & Drag Handling via Custom Hook
  // --------------------------------------------------

  const {
    width,
    isResizing,
    startResizing,
    resetWidth: handleResetWidth,
    handleKeyDownResize,
  } = useAiSidebarResize({
    resizable,
    side,
    defaultWidth,
    minWidth,
    maxWidth,
    storageKey,
    isOpen,
  });

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
