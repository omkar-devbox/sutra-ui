// ----------------------------------------------------
// Imports
// ----------------------------------------------------

import React, { useRef, useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Sparkles, Bot, User, ArrowRight } from "lucide-react";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { cn } from "@/shared/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { FileAttachment } from "./FileAttachment";
import { AiErrorBoundary } from "./AiErrorBoundary";
import {
  aiChatAreaStyles,
  aiChatMessageStyles,
} from "../styles/aiSidebar.styles";
import {
  DEFAULT_MESSAGE_GAP_PX,
  DEFAULT_ROW_ESTIMATED_HEIGHT_PX,
} from "../constant/ai.constant";
import type {
  AiChatAreaProps,
  Attachment,
  Message,
  AiStyleConfig,
  AiSuggestion,
} from "../types";

// ----------------------------------------------------
// Constants and Dynamic Configuration
// ----------------------------------------------------

const VIRTUALIZER_OVERSCAN_COUNT = 5;
const AUTO_SCROLL_PROXIMITY_THRESHOLD_PX = 160;

// ----------------------------------------------------
// Helper Functions
// ----------------------------------------------------

/**
 * Default timestamp formatter (HH:mm format).
 */
function defaultFormatTimestamp(timestamp: number): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

// ----------------------------------------------------
// Message Item Component
// ----------------------------------------------------

interface MessageItemProps {
  message: Message;
  styleConfig?: AiStyleConfig;
  showAvatars?: boolean;
  showTimestamps?: boolean;
  userAvatar?: React.ReactNode;
  assistantAvatar?: React.ReactNode;
  formatTimestamp?: (timestamp: number) => string;
}

const MessageItemInner: React.FC<MessageItemProps> = ({
  message,
  styleConfig,
  showAvatars = true,
  showTimestamps = false,
  userAvatar,
  assistantAvatar,
  formatTimestamp = defaultFormatTimestamp,
}) => {
  const role = message.role;
  const isAssistant = role === "assistant";
  const isUser = role === "user";
  const isSystem = role === "system";

  const messageStyles = isUser
    ? styleConfig?.message?.user
    : isAssistant
      ? styleConfig?.message?.assistant
      : styleConfig?.message?.system;

  return (
    <div className={aiChatMessageStyles.wrapper(role)}>
      {/* Role Avatar */}
      {showAvatars && !isSystem && (
        <div
          className={aiChatMessageStyles.avatar(role)}
          style={{
            backgroundColor: isAssistant
              ? styleConfig?.message?.assistantAvatarBg
              : styleConfig?.message?.userAvatarBg,
            color: isAssistant
              ? styleConfig?.message?.assistantAvatarText
              : styleConfig?.message?.userAvatarText,
          }}
          aria-hidden="true"
        >
          {isAssistant ? (
            assistantAvatar ?? <Bot size={18} />
          ) : (
            userAvatar ?? <User size={18} />
          )}
        </div>
      )}

      {/* Message Content Container */}
      <div
        className={aiChatMessageStyles.contentContainer}
        style={{ maxWidth: styleConfig?.message?.maxWidth || "85%" }}
      >
        <div
          className={aiChatMessageStyles.bubble(role)}
          style={{
            backgroundColor: messageStyles?.bg,
            color: messageStyles?.text,
            borderColor: messageStyles?.border,
            borderRadius: messageStyles?.radius,
            padding: messageStyles?.padding,
            fontSize: messageStyles?.fontSize,
            boxShadow: messageStyles?.shadow,
          }}
        >
          {isSystem ? (
            <span>{message.content}</span>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={{
                // Prevent wrapping CodeBlock in default paragraph or pre
                pre({ children }) {
                  return <>{children}</>;
                },
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeText = String(children).replace(/\n$/, "");

                  // If code block has a language identifier or multiline content
                  if (match) {
                    return (
                      <CodeBlock
                        language={match[1]}
                        value={codeText}
                        styleConfig={styleConfig}
                      />
                    );
                  }

                  if (codeText.includes("\n")) {
                    return (
                      <CodeBlock
                        language="text"
                        value={codeText}
                        styleConfig={styleConfig}
                      />
                    );
                  }

                  return (
                    <code
                      className={aiChatMessageStyles.markdown.code}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content || ""}
            </ReactMarkdown>
          )}
        </div>

        {/* Optional Timestamp */}
        {showTimestamps && message.createdAt && (
          <span
            className={aiChatMessageStyles.timestamp(role)}
            style={{
              color: styleConfig?.message?.timestampColor,
              fontSize: styleConfig?.message?.timestampFontSize,
            }}
          >
            {formatTimestamp(message.createdAt)}
          </span>
        )}

        {/* Attachments Section */}
        {Array.isArray(message.attachments) && message.attachments.length > 0 && (
          <div className={aiChatMessageStyles.attachment.container}>
            {message.attachments.map((file: Attachment) => (
              <FileAttachment
                key={file.id}
                attachment={file}
                styleConfig={styleConfig}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Memoized Message Item with Granular Comparator
// ----------------------------------------------------

export const MessageItem = memo(
  MessageItemInner,
  (prev, next) =>
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.message.status === next.message.status &&
    prev.message.isStreaming === next.message.isStreaming &&
    prev.message.attachments === next.message.attachments &&
    prev.showAvatars === next.showAvatars &&
    prev.showTimestamps === next.showTimestamps &&
    prev.styleConfig === next.styleConfig,
);

// ----------------------------------------------------
// Empty State & Suggestions Component
// ----------------------------------------------------

interface EmptyStateViewProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  suggestions?: AiSuggestion[];
  onSuggestionClick?: (suggestion: AiSuggestion) => void;
  styleConfig?: AiStyleConfig;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  title = "How can I help you today?",
  description = "Ask questions, generate components, or upload documents to get started.",
  icon,
  suggestions = [],
  onSuggestionClick,
  styleConfig,
}) => {
  const chatAreaStyles = styleConfig?.chatArea;

  return (
    <div className={aiChatAreaStyles.emptyState.wrapper}>
      {/* Empty State Mascot / Icon */}
      <div
        className={aiChatAreaStyles.emptyState.icon}
        style={{
          backgroundColor: chatAreaStyles?.emptyStateIconBg,
          color: chatAreaStyles?.emptyStateIconColor,
        }}
        aria-hidden="true"
      >
        {icon ?? <Sparkles size={28} />}
      </div>

      {/* Empty State Titles */}
      <div className={aiChatAreaStyles.emptyState.content}>
        <h3
          className={aiChatAreaStyles.emptyState.title}
          style={{ color: chatAreaStyles?.emptyStateTitleColor }}
        >
          {title}
        </h3>
        <p
          className={aiChatAreaStyles.emptyState.description}
          style={{ color: chatAreaStyles?.emptyStateDescriptionColor }}
        >
          {description}
        </p>
      </div>

      {/* Suggestion Cards */}
      {suggestions.length > 0 && (
        <div className={aiChatAreaStyles.suggestion.grid}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => onSuggestionClick?.(suggestion)}
              type="button"
              className={aiChatAreaStyles.suggestion.button}
              style={{
                backgroundColor: chatAreaStyles?.suggestionBg,
                borderColor: chatAreaStyles?.suggestionBorder,
                borderRadius: chatAreaStyles?.suggestionRadius,
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {suggestion.icon && (
                  <span
                    className="shrink-0 text-xs"
                    style={{ color: chatAreaStyles?.suggestionIconColor }}
                    aria-hidden="true"
                  >
                    {suggestion.icon}
                  </span>
                )}
                <span
                  className={aiChatAreaStyles.suggestion.label}
                  style={{ color: chatAreaStyles?.suggestionText }}
                >
                  {suggestion.label}
                </span>
              </div>
              <ArrowRight
                size={14}
                className={aiChatAreaStyles.suggestion.icon}
                style={{ color: chatAreaStyles?.suggestionIconColor }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// Main Chat Area Component Implementation
// ----------------------------------------------------

export const AiChatArea: React.FC<AiChatAreaProps> = ({
  messages,
  isTyping,
  suggestions = [],
  onSuggestionClick,
  onScrollToBottom,
  styleConfig,
  className,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  renderEmptyState,
  renderMessage,
  renderTypingIndicator,
  showAvatars = true,
  showTimestamps = false,
  userAvatar,
  assistantAvatar,
  formatTimestamp,
  autoScroll = true,
  messageGap,
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);

  // Spacing gap in pixels between virtualized message rows
  const effectiveGap = messageGap ?? styleConfig?.chatArea?.messageGap ?? DEFAULT_MESSAGE_GAP_PX;

  // Setup TanStack Virtualizer with dynamic measurement and vertical row spacing
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => DEFAULT_ROW_ESTIMATED_HEIGHT_PX,
    gap: effectiveGap,
    overscan: VIRTUALIZER_OVERSCAN_COUNT,
  });

  const items = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  // Track the content of the latest message for auto-scrolling during streaming
  const lastMessage = messages[messages.length - 1];
  const lastMessageContent = lastMessage?.content || "";
  const isStreamingActive = lastMessage?.isStreaming || isTyping;

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    if (!autoScroll) return;

    const scrollContainer = parentRef.current;
    if (!scrollContainer) return;

    // Check if user is scrolled near the bottom within threshold
    const isNearBottom =
      scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight <
      AUTO_SCROLL_PROXIMITY_THRESHOLD_PX;

    if (isNearBottom || isStreamingActive) {
      rowVirtualizer.scrollToOffset(totalSize, { align: "end" });
      onScrollToBottom?.();
    }
  }, [
    messages.length,
    lastMessageContent,
    totalSize,
    isStreamingActive,
    autoScroll,
    onScrollToBottom,
    rowVirtualizer,
  ]);

  // Determine if conversation is empty (ignoring hidden system initialization)
  const userVisibleMessages = messages.filter((message) => message.role !== "system");
  const isChatEmpty = userVisibleMessages.length === 0;

  const chatAreaStyles = styleConfig?.chatArea;

  return (
    <div
      ref={parentRef}
      className={cn(aiChatAreaStyles.root, className)}
      style={{
        backgroundColor: chatAreaStyles?.bg,
        padding: chatAreaStyles?.padding,
      }}
      role="log"
      aria-label="Chat messages history"
    >
      {/* Empty State Screen when no messages exist */}
      {isChatEmpty && (
        renderEmptyState ? (
          renderEmptyState()
        ) : (
          <EmptyStateView
            title={emptyStateTitle}
            description={emptyStateDescription}
            icon={emptyStateIcon}
            suggestions={suggestions}
            onSuggestionClick={onSuggestionClick}
            styleConfig={styleConfig}
          />
        )
      )}

      {/* Virtualized Message Rows */}
      {!isChatEmpty && (
        <div style={{ height: totalSize, position: "relative" }}>
          {items.map((row: VirtualItem) => {
            const msg = messages[row.index];
            if (!msg) return null;

            return (
              <div
                key={msg.id}
                data-index={row.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${row.start}px)`,
                  width: "100%",
                }}
              >
                <AiErrorBoundary>
                  {renderMessage ? (
                    renderMessage(msg, row.index)
                  ) : (
                    <MessageItem
                      message={msg}
                      styleConfig={styleConfig}
                      showAvatars={showAvatars}
                      showTimestamps={showTimestamps}
                      userAvatar={userAvatar}
                      assistantAvatar={assistantAvatar}
                      formatTimestamp={formatTimestamp}
                    />
                  )}
                </AiErrorBoundary>
              </div>
            );
          })}
        </div>
      )}

      {/* Assistant Typing / Thinking Indicator */}
      {isTyping && (
        renderTypingIndicator ? (
          renderTypingIndicator()
        ) : (
          <div
            className={aiChatMessageStyles.typingIndicator}
            style={{
              backgroundColor: chatAreaStyles?.typingIndicatorBg,
              color: chatAreaStyles?.typingIndicatorText,
              borderColor: chatAreaStyles?.typingIndicatorBorder,
            }}
          >
            <Sparkles className="animate-spin text-[#0077be] dark:text-[#38bdf8]" size={14} aria-hidden="true" />
            <span>Thinking...</span>
          </div>
        )
      )}
    </div>
  );
};
